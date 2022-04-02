export interface BlogModel {
  id?: number;
  introduce?: string;
  isTop?: number;
  title?: string;
  typeName?: string;
  view_count?: number;
  type_id?: number;
  article_content?: string;
  addTime?: string;
  article_id?: number; //暂存文章存在
}
