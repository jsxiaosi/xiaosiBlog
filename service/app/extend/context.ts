
export default {
  handleData(data:Record<string, any>) {
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
};
