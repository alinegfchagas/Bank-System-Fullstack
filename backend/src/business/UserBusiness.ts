import { UserDatabase } from "../database/UserDatabase";
import { IInputDTO, IOutputDTO, User } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  constructor(
    private userDataBase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}


  public cadastro = async (input: IInputDTO) => {
    const { username, password } = input;
    // const validPassword = 
    if (typeof username!== "string") {
      throw new Error("Parâmetro 'username' inválido");
    }

    if (typeof password !== "string") {
      throw new Error("Parâmetro 'password' inválido");
    }

    if (username.length < 3) {
      throw new Error(
        "Parâmetro 'username' inválido: mínimo de 3 caracteres"
      );
    }

    if (password.length < 8) {
      throw new Error(
        "Parâmetro 'password' inválido: mínimo de 8 caracteres"
      );
    }

    // if (!password.includes(/^[A-Za-z]$/g)) {
    //   throw new Error("Parâmetro 'password' precisa conter letra maiúscula");
    // }
    // const thisUserExists = await this.userDataBase.findUserName(username)

    const id = this.idGenerator.generate();
    
    const accountId = this.idGenerator.generate();

    await this.userDataBase.createAccount(accountId)
    const hashedPassword = await this.hashManager.hash(password)

    
    const user = new User(id, username, hashedPassword, accountId)
    await this.userDataBase.createUser(user)
    const payload: ITokenPayload = {
      id: user.getId()
    };

    const token = this.authenticator.generateToken(payload);

    const response:IOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token,
    };
    return response;
  };





}