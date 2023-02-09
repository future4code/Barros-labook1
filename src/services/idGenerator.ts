import { v4 } from 'uuid'

class idGenerator {
    idGenerator = () => {
        return v4()
    }
}

export default idGenerator