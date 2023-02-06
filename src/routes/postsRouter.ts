import express from 'express'
import PostsController from '../controller/PostsController'

export const postsRouter = express.Router()

const postsController = new PostsController()

postsRouter.get("/", postsController.getAllPosts)

postsRouter.get("/post/:id", postsController.getPost)

postsRouter.get("/feed/:id", postsController.getUserFeed)

postsRouter.post("/", postsController.createPost)