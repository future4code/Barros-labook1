import { CustomError } from "../CustomError";

class MissingPassword extends CustomError {
    constructor(){
        super(422, "Password required.")
    }
}

export default MissingPassword