import User from "../model/User"
import { UserIdDTO } from "../model/UsersDTO"
import BaseDatabase from "./BaseDatabase"

class UsersDatabase extends BaseDatabase {
    TABLE_NAME = "labook_users"

    getAllUsers = async () => {
        return await UsersDatabase.connection(this.TABLE_NAME).select("*")
    }

    insertUser = async (user: User) => {
        await UsersDatabase.connection(this.TABLE_NAME).insert(user)
    }

    getUser = async (input: UserIdDTO) => { 
        return await UsersDatabase.connection(this.TABLE_NAME).select("*").where("id", input.id)
    }
}

export default UsersDatabase