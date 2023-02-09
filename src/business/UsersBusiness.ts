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

const usersDatabase = new UsersDatabase()
const id = new idGenerator()

class UsersBusiness {

    getUsers = async (): Promise<User[]> => {
        try{
            const users = await usersDatabase.getUsers()

            if(users.length < 1){
                throw new EmptyListError()
            }

            return await usersDatabase.getUsers()
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)            
        }
    }

    getUsersAllInfos = async (): Promise<User[]> => {
        try{
            const users = await usersDatabase.getUsers()

            if(users.length < 1){
                throw new EmptyListError()
            }

            return usersDatabase.getUsersAllInfos(users)
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

            const users = await usersDatabase.getUsers()
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

    getUser = async (input: UserIdDTO): Promise<any> => {
        try{
            if(input.id === ":id"){
                throw new MissingUserId()
            }

            const users = await usersDatabase.getUsers()
            const userExisting = users.filter(user => user.id === input.id)

            if(userExisting.length < 1){
                throw new UserNotExisting()
            }            

            return await usersDatabase.getUser(input)            

        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)  
        }
    }
}

export default UsersBusiness