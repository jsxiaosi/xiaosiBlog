import { DataType } from '#/axios';
import { deffHttp } from '@/utils/axios';
import { BriefArticleModel } from './briefArticleModel';

enum Api {
  GET_ARTICLE_LIST = '/brief_article/list',
  GET_ARTICLE_INFO = '/brief_article/info',
  ADD_ARTICLE = '/brief_article/add',
  UPDATE_ARTICLE = '/brief_article/update',
  DELARTICLE = '/brief_article/delete',
}

export const briefArticleListApi = () =>
  deffHttp.get<BriefArticleModel[]>({ url: Api.GET_ARTICLE_LIST });

export const briefArticleInfoApi = (data: { id: number }) =>
  deffHttp.get<BriefArticleModel>({ url: Api.GET_ARTICLE_INFO, data });

export const addbriefArticleApi = (data: BriefArticleModel) =>
  deffHttp.post<DataType>({ url: Api.ADD_ARTICLE, data });

export const updatebriefArticleApi = (data: BriefArticleModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_ARTICLE, data });

export const delbriefArticleApi = (data: { id: number }) =>
  deffHttp.delete<DataType>({ url: Api.DELARTICLE, data });
