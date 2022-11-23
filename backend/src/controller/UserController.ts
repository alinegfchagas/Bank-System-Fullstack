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
                userName:req.body.username,
                password:req.body.password
            }
            const response = await this.userBusiness.register(input)
            res.status(201).send(response)

        } catch (error:any) {
            // if (error){
            //     return res.status(error.statusCode).send({message:error.message})
            // }
            res.status(500).send(error.message||error.sqlMessage )
        }
    }


    public loginUser = async (req:Request, res:Response) =>{
        try {
            const input:IInputDTO = {
                userName:req.body.username,
                password:req.body.password
            }
            const response = await this.userBusiness.doLogin(input)
            res.status(200).send(response)

        } catch (error:any) {
            // if (error){
            //     return res.status(error.statusCode).send({message:error.message})
            // }
            res.status(500).send(error.message||error.sqlMessage )
        }
    }
}
