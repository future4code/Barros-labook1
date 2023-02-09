enum PostType {
    NORMAL= "normal",
    EVENT= "event"    
}

export interface PostCreateInputDTO {
    photo: string,
    description: string,
    type: PostType,
    authorId: string
}

export interface PostIdDTO {
    id: string
}

export interface LikeOrDislikePostInputDTO {
    userId: string, 
    postId: string
}

export interface CommentPostInputDTO {
    userId: string,
    postId: string,
    comment: string, 
}

export interface PostIdLikeDTO {
    postId: string
}