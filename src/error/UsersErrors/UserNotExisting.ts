import { CustomError } from "../CustomError"

class UserNotExisting extends CustomError {
    constructor(){
        super(404, "User not found.")
    }
}

export default UserNotExisting