import Friendship from "../model/Friendship"
import { FriendshipInputDTO } from "../model/FriendshipDTO"
import BaseDatabase from "./BaseDatabase"

class FriendshipDatabase extends BaseDatabase {
    TABLE_NAME = "labook_friendships"

    getAllFriendships =async () => {
        return await FriendshipDatabase.connection(this.TABLE_NAME).select("*")        
    }

    createFriendship = async (newFriendship: Friendship, secondNewFriendship: Friendship) => {
        await FriendshipDatabase.connection(this.TABLE_NAME).insert([newFriendship, secondNewFriendship])
    }

    undoFriendship =async (input: FriendshipInputDTO) => {
        await FriendshipDatabase.connection(this.TABLE_NAME).whereLike("labook_friendships.user_id", input.userId)
        .andWhereLike("labook_friendships.friend_id", input.friendId)
        .orWhereLike("labook_friendships.user_id", input.friendId)
        .andWhereLike("labook_friendships.friend_id", input.userId)
        .del()
    }
}

export default FriendshipDatabase