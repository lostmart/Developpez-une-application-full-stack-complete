import { Topic } from './topic.model';

export type Author = {
  id: number;
  userName: string;
};

export interface Article {
  id: number;
  title: string;
  date: string;
  author_id: number;
  content: string;
  topic?: Topic[];
  createdAt?: Date;
  author?: Author;
}
