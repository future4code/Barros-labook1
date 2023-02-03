import { CustomError } from "../error/CustomError"
import Friendship from "../model/Friendship"
import { FriendshipCreateInputDTO } from "../model/FriendshipDTO"
import BaseDatabase from "./BaseDatabase"

class FriendshipDatabase extends BaseDatabase {
    TABLE_NAME = "labook_friendships"

    getAllFriendships =async () => {
        return await FriendshipDatabase.connection(this.TABLE_NAME).select("*")        
    }

    createFriendship = async (friendship: Friendship) => {
        await FriendshipDatabase.connection(this.TABLE_NAME).insert(friendship)
    }
}

export default FriendshipDatabase