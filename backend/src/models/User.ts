
export interface IUserDB {
    id:string,
    username: string,
    password: string,
    accountId:string
}


export interface IInputDTO{
    username:string,
    password:string
}

export interface IOutputDTO {
    message:string,
    token:string
}




export class User {
    constructor(
        private id: string,
        private username: string,
        private password: string,
        private accountId: string
    ) {}

    public getId = () => {
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }
    public getUsername = () => {
        return this.username
    }

    public setUsername = (newUserName: string) => {
        this.username = newUserName
    }

    public getPassword = () => {
        return this.password
    }

    public setPassword = (newPassword: string) => {
        this.password = newPassword
    }

    public getAccountId = () => {
        return this.accountId
    }

    public setAccountId= (newId: string) => {
        this.accountId = newId
    }

    
}
