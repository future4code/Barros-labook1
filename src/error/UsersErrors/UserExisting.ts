import { CustomError } from "../CustomError"

class UserExisting extends CustomError {
    constructor(){
        super(400, "User already registered.")
    }
}

export default UserExisting