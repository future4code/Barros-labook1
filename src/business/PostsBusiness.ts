import { CustomError } from "../error/CustomError"
import PostsDatabase from "../data/PostsDatabase"
import EmptyListError from "../error/EmptyListError"
import { PostCreateInputDTO, PostIdDTO } from "../model/PostsDTO"
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
import BaseDatabase from "../data/BaseDatabase"

const postsDatabase = new PostsDatabase()
const usersDatabase = new UsersDatabase()
const id = new idGenerator()
let ids: string[] = []

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

    createPost = async (input: PostCreateInputDTO): Promise<void> => {

        let normal = "normal"
        let event = "event"

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

            const allUsers = await usersDatabase.getAllUsers()
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

            const allUsers = await usersDatabase.getAllUsers()
            const userExisting = allUsers.filter(user => user.id === input.id)

            if(userExisting.length < 1){
                throw new UserNotExisting()
            }

            const userFriendships = await BaseDatabase.connection("labook_friendships")
            .select("*")
            .whereLike("labook_friendships.user_id", input.id)

            userFriendships.forEach((user)=>{
                ids.push(user.friend_id)
            })

            return await postsDatabase.getUserFeed(ids)
            
        }catch(err: any){
            throw new CustomError(err.statusCode, err.message) 
        }
    } 
}

export default PostsBusiness