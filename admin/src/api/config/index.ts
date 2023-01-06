import { deffHttp } from '@/utils/axios';

enum Api {
  BAIDU_SEO = '/config/baidu_seo',
}

export const baiduSEOApi = (data: string[]) =>
  deffHttp.post<{
    success: number;
    remain: number;
    not_same_site: string[];
    not_valid: string[];
    error: number;
    message: string;
  }>({ url: Api.BAIDU_SEO, data });
