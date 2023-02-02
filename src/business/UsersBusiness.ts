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
import PostsDatabase from "../data/PostsDatabase"

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
                const posts = await PostsDatabase.connection("labook_posts").select("*").whereLike("author_id", user.id)

                let userWithPosts = {
                    user, 
                    posts
                }

                allUsers.push(userWithPosts)
            }

            return await usersDatabase.getAllUsers()
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
                const posts = await PostsDatabase.connection("labook_posts").select("*").whereLike("author_id", userItem.id)

                userObject = {
                    user, 
                    posts
                }
            }
            
            return userObject

        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)  
        }
    }
}

export default UsersBusiness