import { Article, Author } from './article.model';

export interface Comment {
  id: number;
  date: string;
  author: Author;
  content: string;
  articleId: Article['id'];
}
