import { Topic } from './topic.model';

export interface Article {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
  topic?: Topic[];
}
