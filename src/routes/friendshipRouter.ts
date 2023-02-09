import express from 'express'
import FriendshipController from '../controller/FriendshipController'

export const friendshipRouter = express.Router()

const friendshipController = new FriendshipController()

friendshipRouter.get("/", friendshipController.getAllFriendships)

friendshipRouter.post("/:user_id", friendshipController.createFriendship)

friendshipRouter.delete("/:user_id", friendshipController.undoFriendship)
