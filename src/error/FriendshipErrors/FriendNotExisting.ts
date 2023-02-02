import { CustomError } from "../CustomError"

class FriendNotExisting extends CustomError {
    constructor(){
        super(404, "Friend not found.")
    }
}

export default FriendNotExisting