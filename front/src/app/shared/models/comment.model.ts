export interface CommentAuthor {
  id: number;
  username: string;
  email: string;
  picture: string | null;
}

export interface ApiComment {
  id: number;
  content: string;
  author: CommentAuthor;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentPayload {
  content: string;
  postId: number;
}
