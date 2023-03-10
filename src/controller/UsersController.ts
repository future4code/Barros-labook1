import { Request, Response } from "express"
import UsersBusiness from "../business/UsersBusiness"
import { UserIdDTO, UserSignUpInputDTO } from "../model/UsersDTO"

const usersBusiness = new UsersBusiness()

class UsersController {

    getUsers =async (req: Request, res: Response): Promise<void> => {
        try{
            const users = await usersBusiness.getUsers()

            res.status(200).send(users)
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    getUsersAllInfos = async (req: Request, res: Response): Promise<void> => {
        try{
            const allUsers = await usersBusiness.getUsersAllInfos()

            res.status(200).send(allUsers)
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    signup = async (req: Request, res: Response): Promise<void> => {
        try{
            const input: UserSignUpInputDTO = {
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password
            }

            await usersBusiness.signup(input)

            res.status(201).send("User created.")
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    getUser = async (req: Request, res: Response): Promise<void> => {
        try{
            const input: UserIdDTO = {
                id: req.params.id
            }

            const user = await usersBusiness.getUser(input)

            res.status(200).send(user)
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}

export default UsersController