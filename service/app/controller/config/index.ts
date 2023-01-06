import { Controller } from 'egg';

export default class ConfigController extends Controller {
  public async baiduSEO() {
    const { ctx } = this;
    const datainfo = await ctx.curl(
      'http://data.zz.baidu.com/urls?site=YouLink&token=YouToken',
      {
        method: 'POST',
        data: ctx.request.body.join('\n'),
        headers: {
          host: 'data.zz.baidu.com',
          'user-agent': 'curl/7.12.1',
          'content-type': 'text/plain',
        },
      },
    );
    console.log('123123123', JSON.parse(datainfo.data));
    ctx.body = { data: JSON.parse(datainfo.data), code: 1 };
  }
}
