import Like from "../model/Like";
import Post from "../model/Post";
import { LikeOrDislikePostInputDTO, PostIdDTO, PostIdLikeDTO } from "../model/PostsDTO";
import { UserIdDTO } from "../model/UsersDTO";
import BaseDatabase from "./BaseDatabase";
import FriendshipDatabase from "./FriendshipDatabase";

const friendshipsDatabase = new FriendshipDatabase()

class PostsDatabase extends BaseDatabase {
    TABLE_NAME = "labook_posts"

    getAllPosts = async () => {        
        return await PostsDatabase.connection(this.TABLE_NAME).select("*")
    }

    getPostsByType = async (type: string) => {        
        return await PostsDatabase.connection(this.TABLE_NAME).select("*").where("type", type.toLowerCase()).orderBy("created_at", "desc")
    }

    createPost = async (post: Post) => {
        await PostsDatabase.connection(this.TABLE_NAME).insert(post)
    }

    getPost = async (input: PostIdDTO) => {
        return await PostsDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", input.id)
    }

    getUserFeed = async (input: UserIdDTO) => {

        let ids: string[] = []

        const userFriendships = await friendshipsDatabase.getUserFriendships(input)

        userFriendships.forEach((user)=>{
            ids.push(user.friend_id)
        })

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

    getPostLikes = async (input: PostIdLikeDTO) => {        
        return await PostsDatabase.connection("labook_posts_likes").select("*").where("post_id", input.postId)
    }

    likePost = async (input: LikeOrDislikePostInputDTO, newLike: Like) => {
        await PostsDatabase.connection("labook_posts_likes").insert(newLike)
    }

    dislikePost = async (input: LikeOrDislikePostInputDTO) => {        
        return await PostsDatabase.connection("labook_posts_likes").whereLike("user_id", input.userId).andWhereLike("post_id", input.postId).update("liked", "no")
    }
}

export default PostsDatabase