import { CustomError } from "./CustomError";

class EmptyListError extends CustomError{
    constructor(){
        super(404, "Empty list.")
    }
}

export default EmptyListError