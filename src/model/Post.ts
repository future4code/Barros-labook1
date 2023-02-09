class Post {
    constructor(
        private id: string,
        private photo: string,
        private description: string,
        private type: string,
        private created_at: Date,
        private author_id: string
    ){
    }
 }

 export default Post 