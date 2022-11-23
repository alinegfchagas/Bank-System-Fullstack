import { Request, Response } from "express";
import { TransactionBusiness } from "../business/TransactionBusiness";

export class TransactionController {
  constructor(private transactionBusiness: TransactionBusiness) {}
  
  public transferAccount = async (req: Request, res: Response) => {
    try {
      const input: any = {
        token: req.headers.Authorization as string,
        userNameCashIn: req.body.username,
        value: req.body.value
      };
      console.log("_________________");
      console.log(input);
      console.log("_________________");
      
      const response = await this.transactionBusiness.transferAccount(input);
      res.status(200).send(response);
    } catch (error: any) {
      // if (error){ 
      //     return res.status(error.statusCode).send({message:error.message})
      // }
      res.status(500).send(error.message || error.sqlMessage);
    }
  };
}
