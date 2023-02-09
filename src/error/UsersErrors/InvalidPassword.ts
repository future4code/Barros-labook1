import { CustomError } from "../CustomError";

class InvalidPassword extends CustomError {
    constructor(){
        super(422, "The password must be at least 8 characters long.")
    }
}

export default InvalidPassword