import { Request, Response } from "express"
import FriendshipBusiness from "../business/FriendshipBusiness"
import { FriendshipInputDTO } from "../model/FriendshipDTO"

const friendshipBusiness = new FriendshipBusiness()

class FriendshipController {

    getAllFriendships = async (req: Request, res: Response): Promise<void> => {
        try{
            const allFriendships = await friendshipBusiness.getAllFriendships()

            res.status(200).send(allFriendships)
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    createFriendship = async (req: Request, res: Response): Promise<void> => {
        try{
            const input: FriendshipInputDTO = {
                userId: req.params.user_id,
                friendId: req.body.friendId
            }

            await friendshipBusiness.createFriendship(input)

            res.status(201).send("Friend added.")
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    undoFriendship =async (req: Request, res: Response): Promise<void> => {
        try{
            const input: FriendshipInputDTO = {
                userId: req.params.user_id,
                friendId: req.body.friendId
            }

            await friendshipBusiness.undoFriendship(input)

            res.status(201).send("Broken friendship.")
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        } 
    }
}

export default FriendshipController