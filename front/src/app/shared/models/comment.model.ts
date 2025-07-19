import { Article } from './article.model';

export interface Comment {
  id: number;
  date: string;
  author: string;
  content: string;
  articleId: Article['id'];
}
