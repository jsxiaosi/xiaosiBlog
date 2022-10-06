import { DataType } from '#/axios';
import { deffHttp } from '@/utils/axios';
import { ProjectModel } from './projectModel';

enum Api {
  GET_TYPEINFO = '/project/list',
  ADD_PROJECT = '/project/add',
  UPDATE_PROJECT = '/project/update',
  DELETE_PROJECT = '/project/delete',
}

export const projectListApi = () => deffHttp.get<ProjectModel[]>({ url: Api.GET_TYPEINFO });

export const addProjectApi = (data: ProjectModel) =>
  deffHttp.post<DataType>({ url: Api.ADD_PROJECT, data });

export const updateProjectApi = (data: ProjectModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_PROJECT, data });

export const deleteProjectApi = (id: number) =>
  deffHttp.delete<DataType>({ url: Api.DELETE_PROJECT, data: { id } });
