import { CustomError } from "../error/CustomError"
import PostsDatabase from "../data/PostsDatabase"
import EmptyListError from "../error/EmptyListError"
import { LikeOrDislikePostInputDTO, PostCreateInputDTO, PostIdDTO, PostIdLikeDTO } from "../model/PostsDTO"
import UsersDatabase from "../data/UsersDatabase"
import MissingPhoto from "../error/PostsErrors/MissingPhoto"
import MissingDescription from "../error/PostsErrors/MissingDescription"
import MissingType from "../error/PostsErrors/MissingType"
import MissingUserId from "../error/UsersErrors/MissingUserId"
import InvalidType from "../error/PostsErrors/InvalidType"
import Post from "../model/Post"
import UserNotExisting from "../error/UsersErrors/UserNotExisting"
import idGenerator from "../services/idGenerator"
import MissingPostId from "../error/PostsErrors/MissingPostId"
import PostNotExisting from "../error/PostsErrors/PostNotExisting"
import { UserIdDTO } from "../model/UsersDTO"
import Like from "../model/Like"

const postsDatabase = new PostsDatabase()
const usersDatabase = new UsersDatabase()
const id = new idGenerator()
let normal = "normal"
let event = "event"

class PostsBusiness {
    getAllPosts = async (): Promise<Post[]> => {
        try{
            const allPosts = await postsDatabase.getAllPosts()

            if(allPosts.length < 1){
                throw new EmptyListError()
            }

            return await postsDatabase.getAllPosts()
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getPostsByType = async (type: string): Promise<Post[]> => {
        try{        
            if(!type){
                throw new MissingType()
            } if(type.toUpperCase() !== normal.toUpperCase() && type.toUpperCase() !== event.toUpperCase()){
                throw new InvalidType()
            }           

            const allPosts = await postsDatabase.getAllPosts()

            if(allPosts.length < 1){
                throw new EmptyListError()
            }

            return await postsDatabase.getPostsByType(type)
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)
        }
    }

    createPost = async (input: PostCreateInputDTO): Promise<void> => {

        try{
            if(!input.photo && !input.description && !input.type && !input.authorId){
                throw new CustomError(422, "Post photo, description, type and user id required.")
            } if(!input.photo){
                throw new MissingPhoto()
            } if(!input.description){
                throw new MissingDescription()
            } if(!input.type){
                throw new MissingType()
            } if(!input.authorId){
                throw new MissingUserId()
            } if(input.type.toUpperCase() !== normal.toUpperCase() && input.type.toUpperCase() !== event.toUpperCase()){
                throw new InvalidType()
            }

            const allUsers = await usersDatabase.getUsers()
            const userExisting = allUsers.filter(user => user.id === input.authorId)

            if(userExisting.length < 1){
                throw new UserNotExisting()
            }

            const newPost = new Post(
                id.idGenerator(), 
                input.photo,
                input.description,
                input.type.toLowerCase(),
                new Date(),
                input.authorId
            )

            await postsDatabase.createPost(newPost)

        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getPost = async (input: PostIdDTO): Promise<Post[]> => {
        try{
            if(input.id === ":id"){
                throw new MissingPostId()
            }

            const allPosts = await postsDatabase.getAllPosts()
            const postExisting = allPosts.filter(post => post.id === input.id)

            if(postExisting.length < 1){
                throw new PostNotExisting()
            }

            return await postsDatabase.getPost(input)

        }catch(err: any){
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getUserFeed = async (input: UserIdDTO) => {
        try{
            if(input.id === ":id"){
                throw new MissingUserId()
            }

            const allUsers = await usersDatabase.getUsers()
            const userExisting = allUsers.filter(user => user.id === input.id)

            if(userExisting.length < 1){
                throw new UserNotExisting()
            }

            return await postsDatabase.getUserFeed(input)
            
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message) 
        }
    }

    getPostLikes = async (input: PostIdLikeDTO) => {
        try{
            if(input.postId === ":post_id"){
                throw new MissingPostId
            }

            const allPosts = await postsDatabase.getAllPosts()
            const postExisting = allPosts.filter(post => post.id === input.postId)

            if(postExisting.length < 1){
                throw new PostNotExisting()
            }

            return await postsDatabase.getPostLikes(input)
            
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message) 
        }
    }

    likePost = async (input: LikeOrDislikePostInputDTO) => {
        try{
            if(input.userId === ":user_id"){
                throw new MissingUserId()
            } if(!input.postId){
                throw new MissingPostId()
            }

            const allUsers = await usersDatabase.getUsers()
            const userExisting = allUsers.filter(user => user.id === input.userId)

            if(userExisting.length < 1){
                throw new UserNotExisting()
            } 

            const allPosts = await postsDatabase.getAllPosts()
            const postExisting = allPosts.filter(post => post.id === input.postId)

            if(postExisting.length < 1){
                throw new PostNotExisting()
            }

            const postLikes = await postsDatabase.getPostLikes(input)

            const postAlreadyLiked = postLikes.filter(post => {
                if(post.liked === "yes" && post.user_id === input.userId && post.post_id === input.postId){
                    return post
                }
            })

            if(postAlreadyLiked.length > 0){
                throw new CustomError(409, "Can't like a post twice.")
            }

            const postNeverLiked = postLikes.filter(post => {
                if(post.user_id !== input.userId && post.post_id !== input.postId){
                    return post
                }
            })

            const postDisliked = postLikes.filter(post => {
                if(post.liked === "no" && post.user_id === input.userId && post.post_id === input.postId){
                    return post
                }
            })

            if(postDisliked.length > 0){
                await PostsDatabase.connection("labook_posts_likes").whereLike("user_id", input.userId).andWhereLike("post_id", input.postId).update("liked", "yes")
            }    

            if(postNeverLiked.length > 0){
                const newLike = new Like(
                    id.idGenerator(), 
                    input.userId,
                    input.postId,
                    "yes"
                )
                return await postsDatabase.likePost(input, newLike)
            } 
            
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message) 
        }
    }

    dislikePost = async (input: LikeOrDislikePostInputDTO) => {
        try{
            if(input.userId === ":user_id"){
                throw new MissingUserId()
            } if(!input.postId){
                throw new MissingPostId()
            }

            const allUsers = await usersDatabase.getUsers()
            const userExisting = allUsers.filter(user => user.id === input.userId)

            if(userExisting.length < 1){
                throw new UserNotExisting()
            } 

            const allPosts = await postsDatabase.getAllPosts()
            const postExisting = allPosts.filter(post => post.id === input.postId)

            if(postExisting.length < 1){
                throw new PostNotExisting()
            }

            const postLikes = await postsDatabase.getPostLikes(input)

            const postAlreadyDisliked = postLikes.filter(post => {
                if(post.liked === "no" && post.user_id === input.userId && post.post_id === input.postId){
                    return post
                }
            })

            if(postAlreadyDisliked.length > 0){
                throw new CustomError(409, "You already disliked this post.")
            }

            const postLiked = postLikes.filter(post => {
                if(post.liked === "yes" && post.user_id === input.userId && post.post_id === input.postId){
                    return post
                }
            })

            if(postLiked.length > 0){
                return await postsDatabase.dislikePost(input)
            } else {
                throw new CustomError(409, "You never liked this post before.")
            }
            
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message) 
        }
    }
}

export default PostsBusiness