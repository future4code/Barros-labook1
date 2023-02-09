import { CustomError } from "../CustomError"

class MissingPhoto extends CustomError{
    constructor(){
        super(422, "Photo required.")
    }
}

export default MissingPhoto