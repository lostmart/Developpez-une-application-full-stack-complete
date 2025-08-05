export interface Topic {
  id: number;
  name: string;
  description?: string;
  subscribed?: boolean;
  creator_id: number;
}
