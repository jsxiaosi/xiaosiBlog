import { Controller } from 'egg';
// const fs = require('fs');

export default class ArticleController extends Controller {

  // 客户端首页文章列表接口
  async blogArticleList() {
    const { ctx, app } = this;
    console.log(ctx.query);
    console.log(ctx.params);
    const { id } = ctx.query;
    const sql = `SELECT article.id as id,
                   article.title as title,
                   article.introduce as introduce,
                   FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
                   article.view_count as view_count,
                   type.typeName as typeName
                   FROM article LEFT JOIN type ON article.type_id = type.id 
                   WHERE article.isTop = 0  AND article.type_id = ${id ? id : 'type.id'} 
                   ORDER BY article.id DESC`;

    const resList = await app.mysql.query(sql);
    const resType = await app.mysql.select('type');
    // 置顶文章
    const sql2 = `SELECT article.id as id,
                  article.title as title,
                  article.introduce as introduce,
                  FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
                  article.view_count as view_count,
                  type.typeName as typeName
                  FROM article LEFT JOIN type ON article.type_id = type.id 
                  WHERE article.isTop = 1  AND article.type_id = ${id ? id : 'type.id'} 
                  ORDER BY article.id DESC`;
    const resTopList = await app.mysql.query(sql2);
    ctx.body = {
      list: resList,
      type: resType,
      topList: resTopList,

    };
  }

  // 客户端得到详细页文章接口
  public async blogGetArticleInfo() {
    const { ctx, app } = this;
    console.log(ctx.query)
    const id = ctx.query.id;
    if (id) {
      const sql1 = 'UPDATE article SET view_count = (view_Count+1) WHERE id =' + id;
      const updateResult = await app.mysql.query(sql1) as EggMySQLUpdateResult;
      const updateSuccess = updateResult.affectedRows === 1;
      if (updateSuccess) {
        const sql2 = `SELECT article.id as id,
                      article.title as title,
                      article.introduce as introduce,
                      article.article_content as article_content,
                      FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
                      article.view_count as view_count,
                      type.typeName as typeName
                      FROM article LEFT JOIN type ON article.type_id = type.id WHERE article.id = ${id}`
        const result = await app.mysql.query(sql2) as EggMySQLUpdateResult;
        // const result = await app.mysql.select('article', {
        //   where: { id },
        // });
        ctx.body = { data: result[0], code: 1 };
      }
    } else {
      ctx.body = {
        errMsg: 'id不正确',
        code: -1,
      };
    }
  }

  // 获得文章列表
  public async getArticleList() {
    const { ctx, app } = this;
    const { count, pageSize } = ctx.request.body
    const firstIndex = (count - 1) * pageSize
    const lastIndex = count * pageSize
    console.log(firstIndex, lastIndex)
    // 查询列表
    const sql = `SELECT article.id as id,
                 article.title as title,
                 article.introduce as introduce,
                 FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
                 article.view_count as view_count,
                 article.isTop as isTop,
                 type.typeName as typeName
                 FROM article LEFT JOIN type ON article.type_id = type.Id
                 ORDER BY article.id DESC LIMIT ${firstIndex},${lastIndex}`;
    // 查询分页
    const sql2 = `SELECT COUNT(*) as tooles FROM article`

    const resList = await app.mysql.query(sql);
    const total = await app.mysql.query(sql2);

    console.log(total[0].tooles)

    ctx.body = { data: { list: resList, total: total[0].tooles }, code: 1 };
  }

  // 根据文章ID得到文章详情，用于修改文章
  public async getArticleInfo() {
    const { ctx, app } = this;
    const id = ctx.query.id;
    const result = await app.mysql.select('article', {
      where: { id },
    });
    console.log(result);
    ctx.body = { data: result[0], code: 1 };
  }

  // 添加文章
  public async addArticle() {
    const { ctx, app } = this;
    const tmpArticle = { ...ctx.request.body, addTime: new Date().getTime() / 1000 };

    const sql = 'UPDATE type SET orderNum = (orderNum+1) WHERE id =' + tmpArticle.type_id;
    const updateResult = await app.mysql.query(sql) as EggMySQLUpdateResult;
    const updateSuccess = updateResult.affectedRows === 1;
    if (updateSuccess) {
      const result = await app.mysql.insert('article', tmpArticle) as unknown as EggMySQLUpdateResult;
      ctx.body = ctx.handleData(result);
    } else {
      ctx.body = {
        errMsg: '添加失败，分类id不正确',
        code: -1,
      };
    }
  }

  // 上传文件
  public async upload() {
    const { ctx } = this;
    const data = await ctx.service.upload.index();
    if (data) {
      ctx.body = data;
    } else {
      ctx.body = {
        message: '上传失败',
      };
    }
    // const stream = await this.ctx.getFileStream()
    // console.log('this.ctx.request', stream);

    // var file = stream;
    // var name = stream.fieldname;
    // var dist = 'app/public/upload/' + name;
    // let result = await new Promise((resolve, reject) => {
    //   fs.copyFile(file, dist, (error) => {
    //     if (error) {
    //       reject(error);
    //       console.log("fail");
    //     } else {
    //       resolve(true);
    //       console.log("success");
    //     }
    //   });
    // });
    // console.log(result)
    // this.ctx.body = {
    //   errMsg: '添加失败，分类id不正确',
    //   code: -1,
    // };
  }


  // 修改文章
  public async updateArticle() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    const result = await app.mysql.update('article', tmpArticle);
    ctx.body = ctx.handleData(result);
  }

  // 修改文章置顶信息
  public async updateIsTop() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    const sql = 'update  article set isTop = ' + tmpArticle.isTop + ' where id = ' + tmpArticle.id;
    const updateResult = await app.mysql.query(sql);
    ctx.body = ctx.handleData(updateResult);
  }

  // 删除文章
  public async delArticle() {
    const { ctx, app } = this;
    const id = ctx.request.body.id;
    const res = await app.mysql.delete('article', { id });
    if (res.affectedRows) {
      ctx.body = { data: { msg: '删除成功' }, code: 1 };
    } else {
      ctx.body = { errMsg: '删除失败，id不正确', code: -1 };
    }
  }
}

