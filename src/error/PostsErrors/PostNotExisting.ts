import { CustomError } from "../CustomError"

class PostNotExisting extends CustomError {
    constructor(){
        super(404, "Post not found.")
    }
}

export default PostNotExisting