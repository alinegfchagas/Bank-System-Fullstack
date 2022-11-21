// import { AccountDatabase } from "./AccountDatabase"
// import { BaseDatabase } from "./BaseDatabase"
// import { TransactionDatabase } from "./TransactionDatabase"
// import { UserDatabase } from "./UserDatabase"

// class Migrations extends BaseDatabase {
//     execute = async () => {
//         try {
//             console.log("Creating tables...")
//             await this.createTables()
//             console.log("Tables created successfully.")

//             console.log("Populating tables with seed...")
//             await this.insertData()
//             console.log("Tables populated successfully.")

//             console.log("Migrations completed.")
//         } catch (error) {
//             console.log("FAILED! Error in migrations...")
//             if (error instanceof Error) {
//                 console.log(error.message)
//             }
//         } finally {
//             console.log("Ending connection...")
//             BaseDatabase.connection.destroy()
//             console.log("Connection closed graciously.")
//         }
//     }

//     createTables = async () => {
//         await BaseDatabase.connection.raw(`
//         DROP TABLE IF EXISTS ${UserDatabase.TABLE_USERS};
//         DROP TABLE IF EXISTS ${AccountDatabase.TABLE_ACCOUNT};
//         DROP TABLE IF EXISTS ${TransactionDatabase.TABLE_TRANSACTIONS};
      
//         CREATE TABLE IF NOT EXISTS ${AccountDatabase.TABLE_ACCOUNT} (
//             id VARCHAR(255) PRIMARY KEY,
//             balance DECIMAL(15,2) DEFAULT 100
//         );

//         CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_USERS} (
//             id VARCHAR(255) PRIMARY KEY,
//             username VARCHAR(255) NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             accountId VARCHAR(255) UNIQUE,
//             FOREIGN KEY (accountId) REFERENCES Ng_Accounts(id)
//         );
        
        
//         CREATE TABLE IF NOT EXISTS ${TransactionDatabase.TABLE_TRANSACTIONS} (
//             id VARCHAR(255) PRIMARY KEY,
//             value DECIMAL(15,2),
//             createdAt DATETIME,
//             debitedAccountId VARCHAR(255),
//             creditedAccountId VARCHAR(255),
//             FOREIGN KEY (debitedAccountId ) REFERENCES Ng_Accounts (id),
//             FOREIGN KEY (creditedAccountId) REFERENCES Ng_Accounts (id)
//         );
        
//         `)
//     }

//     insertData = async () => {
//         await BaseDatabase
//             .connection(AccountDatabase.TABLE_ACCOUNT)
//             .insert("accounts")

//         await BaseDatabase
//             .connection(UserDatabase.TABLE_USERS)
//             .insert("user")

//         await BaseDatabase
//             .connection(TransactionDatabase.TABLE_TRANSACTIONS)
//             .insert("transaction")
//     }
// }

// const migrations = new Migrations()
// migrations.execute()