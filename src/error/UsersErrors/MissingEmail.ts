import { CustomError } from "../CustomError";

class MissingEmail extends CustomError {
    constructor(){
        super(422, "E-mail required.")
    }
}

export default MissingEmail