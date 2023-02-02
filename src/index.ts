import app from "./app"
import { postsRouter } from "./routes/postsRouter"
import { usersRouter } from "./routes/usersRouter"
import { friendshipRouter } from "./routes/friendshipRouter"

app.use("/users", usersRouter)
app.use("/posts", postsRouter)
app.use("/friendships", friendshipRouter)

