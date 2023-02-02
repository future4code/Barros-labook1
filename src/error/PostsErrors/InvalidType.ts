import { CustomError } from "../CustomError"

class InvalidType extends CustomError{
    constructor(){
        super(422, 'Invalid type, needs to be "normal" or "event".')
    }
}

export default InvalidType