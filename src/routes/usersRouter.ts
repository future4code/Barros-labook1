import express from 'express'
import UsersController from '../controller/UsersController'

export const usersRouter = express.Router()

const usersController = new UsersController()

usersRouter.get("/", usersController.getUsers)

usersRouter.get("/all", usersController.getUsersAllInfos)

usersRouter.get("/user/:id", usersController.getUser)

usersRouter.post("/", usersController.signup)

