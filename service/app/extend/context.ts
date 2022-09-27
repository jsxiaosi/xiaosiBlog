const sd = require('silly-datetime');

export default {
  handleData(data: Record<string, any>) {
    const insertSuccess = data.affectedRows === 1;
    const insertId = data.insertId;
    let body = {};
    if (insertSuccess) {
      body = {
        data: {
          id: insertId,
          msg: insertSuccess,
        },
        code: 1,
      };
    } else {
      body = {
        errMsg: '添加失败，id不正确',
        code: -1,
      };
    }
    return body;
  },
  // 修改分类条目数
  async updateOrderNum(app, article) {
    const { id, type_id } = article;
    const oldTypeSql = `SELECT article.type_id FROM article WHERE article.id = ${id}`;
    const oldTypeId = await app.mysql.query(oldTypeSql);
    console.log(oldTypeId);
    if (oldTypeId[0]) {
      if (oldTypeId[0].type_id !== type_id) {
        console.log(oldTypeId);
        const sql =
          'UPDATE type SET orderNum = (orderNum-1) WHERE id =' +
          oldTypeId[0].type_id;
        (await app.mysql.query(sql)) as EggMySQLUpdateResult;
        const sql2 =
          'UPDATE type SET orderNum = (orderNum+1) WHERE id =' + type_id;
        (await app.mysql.query(sql2)) as EggMySQLUpdateResult;
      }
    }
  },
  formatTime() {
    return sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  },
};
