import { deffHttp } from '@/utils/axios';

enum Api {
  BAIDU_SEO = '/config/baidu_seo',
}

export const baiduSEOApi = (data: string[]) => deffHttp.post<any>({ url: Api.BAIDU_SEO, data });
