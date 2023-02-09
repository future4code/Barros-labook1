import { CustomError } from "../CustomError";

class MissingFullName extends CustomError {
    constructor(){
        super(422, "Full name required.")
    }
}

export default MissingFullName