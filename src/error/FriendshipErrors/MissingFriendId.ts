import { CustomError } from "../CustomError";

class MissingFriendId extends CustomError {
    constructor(){
        super(422, "Friend id required.")
    }
}

export default MissingFriendId