import { Article } from './article.model';
import { Comment } from './comment.model';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  articles: Article[];
  comments: Comment[];
}
