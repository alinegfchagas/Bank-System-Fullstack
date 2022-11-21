import { IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "Ng_Users";
  public static TABLE_ACCOUNT = "Ng_Accounts"

  public findUserName = async (
    username: string
  ): Promise<IUserDB | undefined> => {
    const result: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ username });

    return result[0];
  };


  createAccount = async (accountId:string) : Promise<void> => {
    await BaseDatabase
    .connection(UserDatabase.TABLE_ACCOUNT)
    .insert({
      id: accountId,
      balance: "0"
    });
  };

  public createUser = async (user: User): Promise<void> => {

    await BaseDatabase
    .connection(UserDatabase.TABLE_USERS)
    .insert({
      id: user.getId(),
      username: user.getUsername(),
      password: user.getPassword(),
      accountId: user.getAccountId()
    });
  };

  }
    
  





