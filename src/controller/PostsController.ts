import { Request, Response } from "express"
import PostsBusiness from "../business/PostsBusiness"
import { PostCreateInputDTO, PostIdDTO } from "../model/PostsDTO"
import { UserIdDTO } from "../model/UsersDTO"

const postsBusiness = new PostsBusiness()

class PostsController {

    getAllPosts = async (req: Request, res: Response): Promise<void> => {
        try{
            const allPosts = await postsBusiness.getAllPosts()

            res.status(200).send(allPosts)
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    createPost = async (req: Request, res: Response): Promise<void> => {
        try{
            const input: PostCreateInputDTO = {
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type,
                authorId: req.body.authorId
            }            

            await postsBusiness.createPost(input)

            res.status(201).send("Post created.")
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    getPost = async (req: Request, res: Response) => {
        try{
            const input: PostIdDTO = {
                id: req.params.id
            }

            const post = await postsBusiness.getPost(input)

            res.status(200).send(post)
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    getUserFeed = async (req: Request, res: Response): Promise<void> => {
        try{
            const input: UserIdDTO = {
                id: req.params.id
            }

            const feed = await postsBusiness.getUserFeed(input)

            res.status(200).send(feed)
        }catch(err: any){
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}

export default PostsController