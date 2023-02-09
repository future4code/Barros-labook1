import express from 'express'
import PostsController from '../controller/PostsController'

export const postsRouter = express.Router()

const postsController = new PostsController()

postsRouter.get("/", postsController.getAllPosts)

postsRouter.get("/type", postsController.getPostsByType)

postsRouter.get("/post/:id", postsController.getPost)

postsRouter.get("/likes/:post_id", postsController.getPostLikes)

postsRouter.get("/comments/:post_id", postsController.getPostComments)

postsRouter.get("/feed/:id", postsController.getUserFeed)

postsRouter.post("/", postsController.createPost)

postsRouter.post("/like/:user_id", postsController.likePost)

postsRouter.post("/comment/:user_id", postsController.commentPost)

postsRouter.delete("/dislike/:user_id", postsController.dislikePost)