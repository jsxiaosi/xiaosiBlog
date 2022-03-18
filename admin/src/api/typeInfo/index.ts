import { DataType } from '#/axios';
import { deffHttp } from '@/utils/axios';
import { TypeInfoModel } from './typeInfoModel';

enum Api {
  GET_TYPEINFO = '/type/type_list',
  ADD_TYPE = '/type/add',
  UPDATE_TYPE = '/type/update',
  DELETE_TYPE = '/type/delete',
}

export const typeListApi = () => deffHttp.get<TypeInfoModel[]>({ url: Api.GET_TYPEINFO });

export const addTypeApi = (typeName: string) =>
  deffHttp.post<DataType>({ url: Api.ADD_TYPE, data: { typeName } });

export const updateTypeApi = (data: TypeInfoModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_TYPE, data });

export const deleteTypeApi = (id: number) =>
  deffHttp.delete<DataType>({ url: Api.DELETE_TYPE, data: { id } });
