import User from "../model/User"
import { UserIdDTO } from "../model/UsersDTO"
import BaseDatabase from "./BaseDatabase"

class UsersDatabase extends BaseDatabase {
    TABLE_NAME = "labook_users"

    getUsers = async () => {
        return UsersDatabase.connection(this.TABLE_NAME).select("*")
    }

    getUsersAllInfos = async (users: any[]) => {

        let allUsers = []

        for(let user of users){
            const posts = await UsersDatabase.connection("labook_posts").select("*").whereLike("author_id", user.id)
            const friendships = await UsersDatabase.connection("labook_friendships")
            .select("*")
            .whereLike("labook_friendships.user_id", user.id)

            user = {
                user, 
                posts,
                friendships
            }

            allUsers.push(user)
        }

        return allUsers
    }

    insertUser = async (user: User) => {
        await UsersDatabase.connection(this.TABLE_NAME).insert(user)
    }

    getUser = async (input: UserIdDTO) => {

        let userObject

        const user = await UsersDatabase.connection(this.TABLE_NAME).select("*").where("id", input.id)

        for(let userItem of user){
            const posts = await UsersDatabase.connection("labook_posts").select("*").whereLike("author_id", userItem.id)
            const friendships = await UsersDatabase.connection("labook_friendships")
            .select("*")
            .whereLike("labook_friendships.user_id", userItem.id)

            userObject = {
                user, 
                posts,
                friendships
            }
        }
        
        return userObject
    }
}

export default UsersDatabase