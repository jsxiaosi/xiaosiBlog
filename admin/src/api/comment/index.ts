import { ConfigData, DataType } from '#/axios';
import { deffHttp } from '@/utils/axios';
import { CommentModel } from './commentModel';

enum Api {
  GET_COMMENT_LIST = '/comment/comment_list',
  UPDATE_TYPE = '/comment/update',
  DELETE_TYPE = '/comment/delete',
}

export const commentListApi = (data: { count: number; pageSize: number }) =>
  deffHttp.post<{ list: CommentModel[]; total: number }>({ url: Api.GET_COMMENT_LIST, data });

export const updateCommentApi = (data: CommentModel) =>
  deffHttp.post<ConfigData>({ url: Api.UPDATE_TYPE, data });

export const deleteCommentApi = (id: number) =>
  deffHttp.delete<DataType>({ url: Api.DELETE_TYPE, data: { id } });
