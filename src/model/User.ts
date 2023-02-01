class User {
    constructor(
        public id: string,
        private full_name: string,
        private email: string,
        private password: string
    ){
    }
}

export default User