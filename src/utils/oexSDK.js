import * as oexchain from 'oex-web3';

const getAssetInfoHandler = {};
const AssetInfoCache = JSON.parse(localStorage.getItem('AssetInfoCache') || '{}');
const AssetInfoCacheSave = (asset) => {
  asset.__Time = Date.now();
  AssetInfoCache[asset.assetId] = asset.assetName;
  AssetInfoCache[asset.assetName] = asset;
  localStorage.setItem('AssetInfoCache', JSON.stringify(AssetInfoCache));
};
const OneDay = 24 * 60 * 60 * 1000;

/**
 * 这里只是做了一层内存缓存。避免短时间内对相同币种的多次请求
 */
export function getAssetInfoById(id = 0, useCache = true) {
  if (useCache && AssetInfoCache[id]) {
    const name = AssetInfoCache[id];
    const data = AssetInfoCache[name];
    if (data && data.__Time < Date.now() + OneDay) return Promise.resolve(data);
  }
  if (useCache && getAssetInfoHandler[id]) return getAssetInfoHandler[id];
  getAssetInfoHandler[id] = new Promise(async (resolve) => {
    try {
      const res = await oexchain.account.getAssetInfoById(id);
      if (res) AssetInfoCacheSave(res);
      resolve(res);
    } catch (e) {
      resolve(null);
    }
  });
  return getAssetInfoHandler[id];
}
export function getAssetInfoByName(name = 'oextoken', useCache = true) {
  if (useCache && AssetInfoCache[name]) {
    const data = AssetInfoCache[name];
    if (data && data.__Time < Date.now() + OneDay) return Promise.resolve(data);
  }
  if (useCache && getAssetInfoHandler[name]) return getAssetInfoHandler[name];
  getAssetInfoHandler[name] = new Promise(async (resolve) => {
    try {
      const res = await oexchain.account.getAssetInfoByName(name);
      if (res) AssetInfoCacheSave(res);
      resolve(res);
    } catch (e) {
      resolve(null);
    }
  });
  return getAssetInfoHandler[name];
}
