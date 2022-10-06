import { DataType } from '#/axios';
import { deffHttp } from '@/utils/axios';
import { projectTypeModel } from './projectTypeModel';

enum Api {
  GET_TYPEINFO = '/project_type/list',
  ADD_TYPE = '/project_type/add',
  UPDATE_TYPE = '/project_type/update',
  DELETE_TYPE = '/project_type/delete',
}

export const typeListApi = () => deffHttp.get<projectTypeModel[]>({ url: Api.GET_TYPEINFO });

export const addTypeApi = (name: string) =>
  deffHttp.post<DataType>({ url: Api.ADD_TYPE, data: { name } });

export const updateTypeApi = (data: projectTypeModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_TYPE, data });

export const deleteTypeApi = (id: number) =>
  deffHttp.delete<DataType>({ url: Api.DELETE_TYPE, data: { id } });
