import User from "../model/User"
import { UserIdDTO } from "../model/UsersDTO"
import BaseDatabase from "./BaseDatabase"

class UsersDatabase extends BaseDatabase {
    TABLE_NAME = "labook_users"

    getAllUsers = async (): Promise<User[]> => {
        return await UsersDatabase.connection(this.TABLE_NAME).select("*")
    }

    insertUser = async (user: User): Promise<void> => {
        await UsersDatabase.connection(this.TABLE_NAME).insert(user)
    }

    getUser = async (input: UserIdDTO): Promise<User[]> => { 
        return await UsersDatabase.connection(this.TABLE_NAME).select("*").where("id", input.id)
    }
}

export default UsersDatabase