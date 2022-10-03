export interface CommentModel {
  id: number;
  isSelected: number;
  state: number;
  blogId: number;
  blogTitle: string;
  content: string;
  nickname: string;
  contact: string;
  dateTime: string;
}
