import express from 'express'
import app from '../app'
import UsersController from '../controller/UsersController'

export const usersRouter = express.Router()

const usersController = new UsersController()

usersRouter.get("/", usersController.getAllUsers)

usersRouter.post("/", usersController.signup)