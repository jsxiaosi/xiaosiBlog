export interface CommentModel {
  id: number;
  isSelected: number;
  isRead: number;
  blogId: number;
  blogTitle: string;
  content: string;
  nickname: string;
  contact: string;
  dateTime: string;
}
