import { CustomError } from "../CustomError"

class MissingType extends CustomError{
    constructor(){
        super(422, "Type required.")
    }
}

export default MissingType