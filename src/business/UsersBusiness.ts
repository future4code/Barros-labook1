import UsersDatabase from "../data/UsersDatabase"
import { CustomError } from "../error/CustomError"
import MissingEmail from "../error/UsersErrors/MissingEmail"
import MissingFullName from "../error/UsersErrors/MissingFullName"
import MissingId from "../error/UsersErrors/MissingId"
import MissingPassword from "../error/UsersErrors/MissingPassword"
import UserNotExisting from "../error/UsersErrors/UserNotExisting"
import User from "../model/User"
import { UserIdDTO, UserSignUpInputDTO } from "../model/UsersDTO"
import idGenerator from "../services/idGenerator"

const usersDatabase = new UsersDatabase()
const id = new idGenerator()

class UsersBusiness {
    getAllUsers = async (): Promise<User[]> => {
        try{
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

    getUser = async (input: UserIdDTO) => {
        try{
            if(input.id === ":id"){
                throw new MissingId()
            }

            const allUsers = await usersDatabase.getAllUsers()
            const userExisting = allUsers.filter(user => user.id === input.id)

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