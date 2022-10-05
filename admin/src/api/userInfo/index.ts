import { DataType } from '#/axios';
import { deffHttp } from '@/utils/axios';
import { AxiosResponse } from 'axios';
import { UserInfoModel } from './userInfoModel';

enum Api {
  GET_USERINFO = '/blog/userInfo',
  UPDATE_USERINFO = '/admin/update_user',
}

export const updateUserInfoApi = (data: UserInfoModel) =>
  deffHttp.post<DataType>({ url: Api.UPDATE_USERINFO, data });

export const getUserInfoApi = () =>
  deffHttp.get<AxiosResponse<{ userInfo: UserInfoModel }, any>>(
    { url: Api.GET_USERINFO, data: { id: 1 } },
    { isShowData: false },
  );
