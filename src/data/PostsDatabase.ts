import Post from "../model/Post";
import { PostIdDTO } from "../model/PostsDTO";
import BaseDatabase from "./BaseDatabase";

class PostsDatabase extends BaseDatabase {
    TABLE_NAME = "labook_posts"

    getAllPosts = async () => {
        return await PostsDatabase.connection(this.TABLE_NAME).select("*")
    }

    createPost = async (post: Post) => {
        await PostsDatabase.connection(this.TABLE_NAME).insert(post)
    }

    getPost = async (input: PostIdDTO) => {
        return await PostsDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", input.id)
    }

    getUserFeed = async (ids: string[]) => { 

        let friendsPosts: any[] = []

        for(let id of ids){
            const post = await BaseDatabase.connection("labook_posts")
            .select("*")
            .whereLike("labook_posts.author_id", id)
            .orderBy("created_at", "desc")

            friendsPosts.push(post)
        }

        const feed = friendsPosts.reduce((list, sub) => list.concat(sub), [])

        return feed
    }
}

export default PostsDatabase