import { CustomError } from "../CustomError";

class MissingUserId extends CustomError {
    constructor(){
        super(422, "User id required.")
    }
}

export default MissingUserId