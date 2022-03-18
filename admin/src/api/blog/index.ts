import { DataType } from '#/axios';
import { deffHttp } from '@/utils/axios';
import { BlogModel } from './blogModel';

enum Api {
  GET_ARTICLE_LIST = '/article/article_list',
  GET_ARTICLE_INFO = '/article/article_info',
  ADD_ARTICLE = '/article/add',
  UPDATE_ARTICLE = '/article/update',
  DELARTICLE = '/article/delete',
}

export const articleListApi = () => deffHttp.get<BlogModel[]>({ url: Api.GET_ARTICLE_LIST });

export const articleInfoApi = (data: { id: number }) =>
  deffHttp.get<BlogModel>({ url: Api.GET_ARTICLE_INFO, data });

export const addArticleApi = (data: BlogModel) =>
  deffHttp.post<DataType>({ url: Api.ADD_ARTICLE, data });

export const updateArticleApi = (data: BlogModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_ARTICLE, data });

export const delArticleApi = (data: { id: number }) =>
  deffHttp.delete<DataType>({ url: Api.DELARTICLE, data });
