import UsersDatabase from "../data/UsersDatabase"
import { CustomError } from "../error/CustomError"
import MissingEmail from "../error/UsersErrors/MissingEmail"
import MissingFullName from "../error/UsersErrors/MissingFullName"
import MissingPassword from "../error/UsersErrors/MissingPassword"
import User from "../model/User"
import { UserSignUpInputDTO } from "../model/UsersDTO"
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
}

export default UsersBusiness