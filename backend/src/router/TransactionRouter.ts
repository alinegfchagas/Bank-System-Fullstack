import { Router } from "express";
import { TransactionBusiness } from "../business/TransactionBusiness";
import { TransactionController } from "../controller/TransactionController";
import { AccountDatabase } from "../database/AccountDatabase";
import { TransactionDatabase } from "../database/TransactionDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const transactionRouter = Router();

const transactionController = new TransactionController(
  new TransactionBusiness(
    new UserDatabase(),
    new AccountDatabase(),
    new TransactionDatabase(),
    new IdGenerator(),
    new Authenticator(), 
)
  
  )

  transactionRouter.post("/exchange", transactionController.transferAccount);
  // transactionRouter.post("/login", transactionController)
