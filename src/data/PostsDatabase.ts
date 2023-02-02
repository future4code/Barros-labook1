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
}

export default PostsDatabase