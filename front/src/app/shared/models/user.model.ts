import { Article } from './article.model';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  articles: Article[];
  comments: any[];
}
