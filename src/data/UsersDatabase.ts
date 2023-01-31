import User from "../model/User"
import BaseDatabase from "./BaseDatabase"
import { CustomError } from "../error/CustomError"

class UsersDatabase extends BaseDatabase {
    TABLE_NAME = "labook_users"

    getAllUsers = async (): Promise<User[]> => {
        return await UsersDatabase.connection(this.TABLE_NAME).select("*")
    }

    insertUser = async (user: User): Promise<void> => {
        await UsersDatabase.connection(this.TABLE_NAME).insert(user)
    }
}

export default UsersDatabase