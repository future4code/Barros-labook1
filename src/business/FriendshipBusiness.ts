import { CustomError } from "../error/CustomError"
import { FriendshipInputDTO } from "../model/FriendshipDTO"
import MissingUserId from "../error/UsersErrors/MissingUserId"
import MissingFriendId from "../error/FriendshipErrors/MissingFriendId"
import UserNotExisting from "../error/UsersErrors/UserNotExisting"
import UsersDatabase from "../data/UsersDatabase"
import FriendNotExisting from "../error/FriendshipErrors/FriendNotExisting"
import FriendshipDatabase from "../data/FriendshipDatabase"
import Friendship from "../model/Friendship"
import idGenerator from "../services/idGenerator"
import EmptyListError from "../error/EmptyListError"

const usersDatabase = new UsersDatabase()
const friendshipDatabase = new FriendshipDatabase()
const id = new idGenerator()

class FriendshipBusiness {
    getAllFriendships = async (): Promise<Friendship[]> => {
        try{
            const friendships = await friendshipDatabase.getAllFriendships()

            if(friendships.length < 1){
                throw new EmptyListError()
            }

            return await friendshipDatabase.getAllFriendships()
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)
        }
    }

    createFriendship = async (input: FriendshipInputDTO): Promise<void> => {
        try{
            if(input.userId === ":user_id"){
                throw new MissingUserId()
            } if(!input.friendId){
                throw new MissingFriendId()
            } if(input.userId === input.friendId){
                throw new CustomError(409, "Unable to add yourself.")
            }

            const allUsers = await usersDatabase.getAllUsers()

            const userExisting = allUsers.filter(user => user.id === input.userId)
            if(userExisting.length < 1){
                throw new UserNotExisting()
            }  
            
            const userFriendExisting = allUsers.filter(userFriend => userFriend.id === input.friendId)
            if(userFriendExisting.length < 1){
                throw new FriendNotExisting()
            }

            const newFriendship = new Friendship(
                id.idGenerator(),
                input.userId, 
                input.friendId
            )

            const allFriendships = await friendshipDatabase.getAllFriendships()
            
            for(let friend of allFriendships){
                if(input.userId === friend.user_id && friend.friend_id === input.friendId){
                    throw new CustomError(409, "Friend already added.")
                }
            }

            await friendshipDatabase.createFriendship(newFriendship)
           
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)  
        }
    }

    undoFriendship = async (input: FriendshipInputDTO): Promise<void> => {
        try{
            if(input.userId === ":user_id"){
                throw new MissingUserId()
            } if(!input.friendId){
                throw new MissingFriendId()
            }

            const allUsers = await usersDatabase.getAllUsers()

            const userExisting = allUsers.filter(user => user.id === input.userId)
            if(userExisting.length < 1){
                throw new UserNotExisting()
            }  
            
            const userFriendExisting = allUsers.filter(userFriend => userFriend.id === input.friendId)
            if(userFriendExisting.length < 1){
                throw new FriendNotExisting()
            }

            const allFriendships = await friendshipDatabase.getAllFriendships()

            for(let friendship of allFriendships){
                if(friendship.user_id !== input.userId && friendship.user_id !== input.friendId && friendship.friend_id !== input.userId && friendship.friend_id !== input.friendId ){
                    throw new CustomError(404, "Non-existent friendship.")
                }
            }

            await friendshipDatabase.undoFriendship(input)
           
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)  
        }
    }
}

export default FriendshipBusiness