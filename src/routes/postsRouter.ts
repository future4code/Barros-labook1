import express from 'express'
import UsersController from '../controller/UsersController'

export const postsRouter = express.Router()

const usersController = new UsersController()