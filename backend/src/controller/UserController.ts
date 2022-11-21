import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness"
import { IInputDTO } from "../models/User";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) {}

    public createUser = async (req:Request, res:Response) =>{
        try {
            const input:IInputDTO = {
                username:req.body.username,
                password:req.body.password
            }
            const response = await this.userBusiness.cadastro(input)
            res.status(201).send(response)

        } catch (error:any) {
            // if (error){
            //     return res.status(error.statusCode).send({message:error.message})
            // }
            res.status(500).send(error.message||error.sqlMessage )
        }
    }
}