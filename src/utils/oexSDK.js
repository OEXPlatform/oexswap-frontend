import * as oexchain from 'oex-web3';

const getAssetInfoHandler = {};

/**
 * 这里只是做了一层内存缓存。避免短时间内对相同币种的多次请求
 */
export function getAssetInfoById(id = 0, useCache = true) {
  if (useCache && getAssetInfoHandler[id]) return getAssetInfoHandler[id];
  getAssetInfoHandler[id] = new Promise(async (resolve) => {
    try {
      const res = await oexchain.account.getAssetInfoById(id);
      resolve(res);
    } catch (e) {
      resolve(null);
    }
  });
  return getAssetInfoHandler[id];
}
