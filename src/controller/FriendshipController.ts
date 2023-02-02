import { Request, Response } from "express"
import FriendshipBusiness from "../business/FriendshipBusiness"
import Friendship from "../model/Friendship"
import { FriendshipCreateInputDTO } from "../model/FriendshipDTO"

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
            const input: FriendshipCreateInputDTO = {
                userId: req.params.user_id,
                friendId: req.body.friendId
            }

            await friendshipBusiness.createFriendship(input)

            res.status(201).send("Friend added.")
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}

export default FriendshipController