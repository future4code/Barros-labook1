import { CustomError } from "../CustomError";

class MissingId extends CustomError {
    constructor(){
        super(422, "Id required.")
    }
}

export default MissingId