import { AxiosInterceptor, CreateAxiosOptions } from './axiosConfig';
import { iAxios } from './iAxios';
import { checkStatus } from './axiosStatus';
import { isString } from 'lodash';
import { useMessage } from '@/hooks/web/useMessage';
import { route } from '@/router/index';
import qs from 'qs';
import Cookies from 'js-cookie';

const { createErrorModal, createErrorMsg } = useMessage();

export const httpsUrl = 'http://127.0.0.1:7001';

const interceptor: AxiosInterceptor = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  requestHook: (res, options) => {
    const { data } = res;
    const { isShowData, errorMessageMode } = options;

    if (data.code === -1) {
      if (errorMessageMode === 'modal') {
        console.log('进来这里了吗？');
        createErrorModal(data.errMsg);
      } else if (errorMessageMode === 'message') {
        createErrorMsg(data.errMsg);
      }
    }

    if (isShowData) {
      if (!data.data) return null;
      else return data.data;
    }

    return res;
  },

  /**
   * @description: 请求失败的错误处理
   */
  requestCatchHook: (e, options) => {
    if (options) '';
    return Promise.reject(e);
  },

  /**
   * @description: 请求之前处理config
   */
  beforeRequestHook: (config, options) => {
    const { urlPrefix } = options;
    if (urlPrefix && isString(urlPrefix)) config.url = `${urlPrefix}${config.url}`;
    console.log(config);
    if (config.method === 'GET') config.url = `${config.url}?${qs.stringify(config.data)}`;
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    console.log('asdasdasdasd', Cookies.get('csrfToken'));
    const { requestOptions } = config;
    if (requestOptions?.withToken) {
      const token = Cookies.get('csrfToken');
      if (token) (config as Recordable).headers['x-csrf-token'] = token;
      // if (requestOptions?.specialToken)
      //   (config as Recordable).headers._token = requestOptions?.specialToken;
    }

    return config;
  },

  /**
   * @description: 请求拦截器错误处理
   */
  requestInterceptorsCatch: (error) => {
    return error;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res) => {
    return res;
  },

  /**
   * @description: 响应拦截器错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, message, config } = error || {};
    console.log(config);
    const errorMessageMode = config.requestOptions.errorMessageMode || 'none';
    let status;
    if (response) {
      if (response.status == 401) {
        localStorage.removeItem('openId');
        console.log(route);
        route.push('/login');
      }
      status = response.status;
    } else {
      status = 400;
    }
    checkStatus(status, message, errorMessageMode);
    return response;
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new iAxios({
    ...{
      acoisadmisf: '',
      // 请求时间
      timeout: 10 * 1000,
      // (拦截器)数据处理方式
      interceptor,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      // 配置项，下面的选项都可以在独立的接口请求中覆盖
      requestOptions: {
        isShowData: true,
        withToken: true,
        errorMessageMode: 'message',
        urlPrefix: `${httpsUrl}/api`,
      },
    },
    ...(opt || {}),
  });
}
export const deffHttp = createAxios();
