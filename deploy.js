const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const OSS = require('ali-oss');
const aes = require('aes-cross');

const uploadList = []; // 文件上传列表

/**
 * 获取命令行输入的密码，用以对ak/sk的解密
 */
const password = process.argv[2];
const passwordValue = password
  .split('')
  .map((str, index) => Math.pow(password.length, index) * str.charCodeAt(0))
  .reduce((a, b) => a + b, 0);
const keyList = [];
for (let i = password.length * 2; keyList.length < 32; i++) keyList.push(passwordValue % i);
aes.setKeySize(256);
const AESConf = {
  key: Buffer.from(keyList),
  iv: Buffer.from([1, 2, 3, 4, 88, 6, 7, 100, 9, 10, 1, 2, 3, 44, 77, 22]),
};
const AliOss = {
  region: 'oss-cn-beijing',
  accessKeyId: '2b25007496ab27a95abc058aa03f18ddebce32f24185d6f59f81d55396420b84',
  accessKeySecret: 'da7b7ea1088fc38adb3cbf7f0cae53b53a6eda24db2d1b95e18906431508d597',
  bucket: 'oexswap',
};
AliOss.accessKeyId = aes.decText(AliOss.accessKeyId, AESConf.key, AESConf.iv, 'utf-8', 'hex');
AliOss.accessKeySecret = aes.decText(AliOss.accessKeySecret, AESConf.key, AESConf.iv, 'utf-8', 'hex');

ForEachDist(path.join(__dirname, 'dist'));
const Handler = new OSS(AliOss);
Handler.useBucket(AliOss.bucket);
doUpload();

function TryUploadFile(fullpath, fullpath2, stats) {
  // 文件不存在
  if (!fs.existsSync(fullpath2)) return UploadFile(fullpath, fullpath2);
  const stats2 = fs.statSync(fullpath2);
  if (stats2.size !== stats.size) return UploadFile(fullpath, fullpath2);

  // 读取一个Buffer
  const buffer = fs.readFileSync(fullpath);
  const buffer2 = fs.readFileSync(fullpath2);
  const fsHash = crypto.createHash('md5');
  const fsHash2 = crypto.createHash('md5');
  fsHash.update(buffer);
  fsHash2.update(buffer2);
  const md5 = fsHash.digest('hex');
  const md52 = fsHash2.digest('hex');
  if (md5 !== md52) return UploadFile(fullpath, fullpath2);
  // console.log('[相同文件]', fullpath);
}

function UploadFile(fullpath, fullpath2) {
  console.log('-->', fullpath);
  const readStream = fs.createReadStream(fullpath);
  const writeStream = fs.createWriteStream(fullpath2);
  readStream.pipe(writeStream);
  // const ossurl = fullpath.replace(/(.*?)\\dist\\/, 'build\\');
  // 等待上传队列
  uploadList.push(fullpath);
}

function ForEachDist(dir) {
  const arr = fs.readdirSync(dir);
  arr.forEach((item) => {
    const fullpath = path.join(dir, item);
    const fullpath2 = fullpath.replace('\\dist\\', '\\build\\');
    const stats = fs.statSync(fullpath);
    if (stats.isDirectory()) {
      if (!fs.existsSync(fullpath2)) fs.mkdirSync(fullpath2);
      ForEachDist(fullpath);
    } else {
      TryUploadFile(fullpath, fullpath2, stats);
    }
  });
}

async function doUpload() {
  const uploadLists = uploadList.map((fullpath) => [fullpath.replace(/(.*?)\\dist\\/, '').replace(/\\/g, '/'), fs.createReadStream(fullpath)]);
  // 找出需要延后上传的
  const lastUpload = uploadLists.filter((item) => ['index.html'].indexOf(item[0]) > -1);
  const perUpload = uploadLists.filter((item) => lastUpload.indexOf(item) === -1);
  // console.log(perUpload.map(i => i[0]));
  await Promise.all(
    perUpload.map((item) => {
      console.log('--<', item[0]);
      return Handler.putStream(item[0], item[1], {
        headers: {
          'Cache-Control': 'max-age=6048000000', // 70天
        },
      });
    })
  );
  await Promise.all(
    lastUpload.map((item) => {
      console.log('--<', item[0]);
      return Handler.putStream(item[0], item[1], {
        headers: {
          'Cache-Control': 'max-age=120', // 2分钟
        },
      });
    })
  );
}
