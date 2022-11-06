import { Service } from 'egg';
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

export default class UploadService extends Service {
  public async index() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    console.log('stream.fields', stream);
    const fileName = stream.filename;
    const filePath = path.join(this.config.baseDir, 'app/public/comfiles');
    // 判断目录是否存在，不存在就创建目录
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    const target = path.join(filePath, `${stream.filename}`);
    const result = await new Promise((resolve, reject) => {
      const remoteFileStream = fs.createWriteStream(target);
      stream.pipe(remoteFileStream);
      let errFlag;
      remoteFileStream.on('error', err => {
        errFlag = true;
        sendToWormhole(stream);
        remoteFileStream.destroy();
        reject(err);
      });

      remoteFileStream.on('finish', async () => {
        if (errFlag) return;
        resolve({ fileName, name: stream.fields.name });
      });
    });
    return result;
  }
}
