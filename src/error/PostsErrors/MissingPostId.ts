import { CustomError } from "../CustomError";

class MissingPostId extends CustomError {
    constructor(){
        super(422, "Post id required.")
    }
}

export default MissingPostId