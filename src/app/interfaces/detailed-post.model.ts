import { User } from './user.model';
import { Post } from './post.model';
export interface DetailedPost extends Post {
    user: User,
    commentsNumber: number
}
