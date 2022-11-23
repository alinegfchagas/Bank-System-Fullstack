import { AccountDatabase } from "../database/AccountDatabase";
import { TransactionDatabase } from "../database/TransactionDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { Account } from "../models/Account";
import { Transaction } from "../models/Transaction";
import { log } from "console";

export class TransactionBusiness {
  constructor(
    private userDataBase: UserDatabase,
    private accountDataBase: AccountDatabase,
    private transactionDatabase: TransactionDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  public transferAccount = async (input: any) => {
    const { token, userNameCashIn, value } = input;
console.log("----")
console.log({token})
console.log("----")
    if (!token || !userNameCashIn || !value) {
      throw new Error("Parametros faltando");
    }
    // Verificação se a conta existe CASH IN
    const userDBCashIn = await this.accountDataBase.getAccount(userNameCashIn);
    const creditedAccount = new Account(userDBCashIn.id, userDBCashIn.balance);
    if (!userDBCashIn) {
      throw new Error("Credenciais inválidas");
    }

    const userTokenData = this.authenticator.getTokenPayload(token);
    const userNameId = userTokenData?.userName as string;
    // Verificação se a conta existe CASH OUT
    const userDBCashOut = await this.accountDataBase.getAccount(userNameId);
    const debitedAccount = new Account(userDBCashOut.id, userDBCashOut.balance);

    if (userNameCashIn === userNameId) {
      throw new Error("Não é possível transferir para sua própria conta");
    }

    if (debitedAccount.getBalance() < value) {
      throw new Error("Saldo insuficiente");
    }

    const calculateCashOut = debitedAccount.getBalance() - value;
    const calculateCashIn = creditedAccount.getBalance() + value;

    await this.accountDataBase.updateCashOut(calculateCashOut,debitedAccount.getId())
    await this.accountDataBase.updateCashIn(calculateCashIn,creditedAccount.getId())


    const id = this.idGenerator.generate();

    const transfer = new Transaction (id,value,debitedAccount.getId(),creditedAccount.getId()) 

    await this.transactionDatabase.bankTransfer(transfer)

    const response:any= {
      message: "Transferencia realizada com sucesso!",
      
    };
    return response;


  };
}
