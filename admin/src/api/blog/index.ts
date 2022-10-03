import { DataType } from '#/axios';
import { deffHttp } from '@/utils/axios';
import { BlogModel } from './blogModel';

enum Api {
  GET_ARTICLE_LIST = '/article/list',
  GET_ARTICLE_INFO = '/article/info',
  ADD_ARTICLE = '/article/add',
  UPDATE_ARTICLE = '/article/update',
  UPDATE_ARTICLE_IS_TOP = '/article/update_top',
  UPDATE_ARTICLE_STATE = '/article/update_state',
  DELARTICLE = '/article/delete',
  UPLOAD = '/article/upload',
}

export const articleListApi = (data: { count: number; pageSize: number }) =>
  deffHttp.post<{ list: BlogModel[]; total: number }>({ url: Api.GET_ARTICLE_LIST, data });

export const articleInfoApi = (data: { id: number }) =>
  deffHttp.get<BlogModel>({ url: Api.GET_ARTICLE_INFO, data });

export const addArticleApi = (data: BlogModel) =>
  deffHttp.post<DataType>({ url: Api.ADD_ARTICLE, data });

export const updateArticleApi = (data: BlogModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_ARTICLE, data });

export const uploadApi = (data: FormData) =>
  deffHttp.post<DataType>({
    url: Api.UPLOAD,
    data,
    headers: { 'content-type': ' multipart/form-data' },
  });

export const updateArticleIsTopApi = (data: BlogModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_ARTICLE_IS_TOP, data });

export const updateArticleStateApi = (data: BlogModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_ARTICLE_STATE, data });

export const delArticleApi = (data: { id: number }) =>
  deffHttp.delete<DataType>({ url: Api.DELARTICLE, data });
