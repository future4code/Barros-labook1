import { CustomError } from "../CustomError"

class MissingDescription extends CustomError{
    constructor(){
        super(422, "Description required.")
    }
}

export default MissingDescription