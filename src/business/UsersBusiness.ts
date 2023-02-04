import UsersDatabase from "../data/UsersDatabase"
import { CustomError } from "../error/CustomError"
import EmptyListError from "../error/EmptyListError"
import MissingEmail from "../error/UsersErrors/MissingEmail"
import MissingFullName from "../error/UsersErrors/MissingFullName"
import MissingPassword from "../error/UsersErrors/MissingPassword"
import UserNotExisting from "../error/UsersErrors/UserNotExisting"
import User from "../model/User"
import { UserIdDTO, UserSignUpInputDTO } from "../model/UsersDTO"
import idGenerator from "../services/idGenerator"
import MissingUserId from "../error/UsersErrors/MissingUserId"
import UserExisting from "../error/UsersErrors/UserExisting"
import InvalidPassword from "../error/UsersErrors/InvalidPassword"
import BaseDatabase from "../data/BaseDatabase"


const usersDatabase = new UsersDatabase()
const id = new idGenerator()
let allUsers: any[] = []
let userObject: any

class UsersBusiness {

    getAllUsers = async (): Promise<User[]> => {
        try{
            const users = await usersDatabase.getAllUsers()

            if(users.length < 1){
                throw new EmptyListError()
            } 

            for(let user of users){
                const posts = await BaseDatabase.connection("labook_posts").select("*").whereLike("author_id", user.id)
                const friendships = await BaseDatabase.connection("labook_friendships")
                .select("*")
                .whereLike("labook_friendships.user_id", user.id)
                .orWhereLike("labook_friendships.friend_id", user.id)

                user = {
                    user, 
                    posts,
                    friendships
                }

                allUsers.push(user)
            }

            return allUsers
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)            
        }
    }

    signup = async (input: UserSignUpInputDTO): Promise<void> => {
        try{
            if(!input.fullName && !input.email && !input.password){
                throw new CustomError(422, "Full name, email and password required.")
            } if(!input.fullName){
                throw new MissingFullName()
            } if(!input.email){
                throw new MissingEmail()
            } if(!input.password){
                throw new MissingPassword()
            } if(input.password.length < 8){
                throw new InvalidPassword()
            }

            const users = await usersDatabase.getAllUsers()
            const userExisting = users.filter(user => user.email === input.email)

            if(userExisting.length > 0){
                throw new UserExisting
            }

            const newUser = new User(
                id.idGenerator(),
                input.fullName,
                input.email,
                input.password
            )

            await usersDatabase.insertUser(newUser)
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)  
        }
    }

    getUser = async (input: UserIdDTO): Promise<User[]> => {
        try{
            if(input.id === ":id"){
                throw new MissingUserId()
            }

            const allUsers = await usersDatabase.getAllUsers()
            const userExisting = allUsers.filter(user => user.id === input.id)

            if(userExisting.length < 1){
                throw new UserNotExisting()
            }            

            const user = await usersDatabase.getUser(input)
            
            for(let userItem of user){
                const posts = await BaseDatabase.connection("labook_posts").select("*").whereLike("author_id", userItem.id)
                const friendships = await BaseDatabase.connection("labook_friendships")
                .select("*")
                .whereLike("labook_friendships.user_id", userItem.id)
                .orWhereLike("labook_friendships.friend_id", userItem.id)

                userObject = {
                    user, 
                    posts,
                    friendships
                }
            }
            
            return userObject

        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)  
        }
    }
}

export default UsersBusiness