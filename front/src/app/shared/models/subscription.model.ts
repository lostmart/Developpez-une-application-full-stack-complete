export interface Subscription {
  id: number;
  userId: number;
  topicName: string;
  subscribed?: boolean;
  description?: string;
  topicId?: number;
}
