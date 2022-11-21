
export interface ITransactionDB {
    id: string,
    value:number;
    date:Date;
    description: string
  
}

export interface IAccountDB {
    accountId:string;
    username:string;
    balance:number;
    statement:Array<ITransactionDB>
}


export class Account {
    constructor(
        private id: string,
        private username: string,
        private balance: string,
        private accountId: string,
    ) {}

    public getId = () => {                                                                            
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public getBalance = () => {
        return this.balance
    }
    public setBalance = (newBalance: string) => {
        this.balance = newBalance
    }
   
}

export class Transactions {
    constructor(
        private id: string,
        private value:number,
        private date:Date,
        private description: string
    ) {}

    public getId = () => {
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }
   
}