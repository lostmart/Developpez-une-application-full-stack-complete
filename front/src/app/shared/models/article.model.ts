import { Topic } from './topic.model';

export interface Article {
  id: number;
  title: string;
  date: string;
  author_id: number;
  content: string;
  topic?: Topic[];
}
