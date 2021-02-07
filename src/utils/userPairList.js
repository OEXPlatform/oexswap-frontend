/**
 * 这里缓存当前用户提供流动性的交易对。
 * 加载 用户流动性列表 时 优先加载已知的交易对，然后一个个加载未知的交易对。
 */

const localKey = 'userPairList';

export const UserPairIndexList = JSON.parse(localStorage.getItem(localKey) || '[]');

export const updateUserPairIndexList = (newList) => {
  UserPairIndexList.splice(0, UserPairIndexList.length, ...newList);
  localStorage.setItem(localKey, JSON.stringify(UserPairIndexList));
};

export const pushToUserPairIndexList = (index) => {
  const index = UserPairIndexList.indexOf(index);
  if (index !== -1) return; // 已经在里面了
  UserPairIndexList.push(index);
  updateUserPairIndexList(UserPairIndexList);
};

export const popFromUserPairIndexList = (index) => {
  const index = UserPairIndexList.indexOf(index);
  if (index === -1) return; // 本就不在里面
  UserPairIndexList.splice(index, 1);
  updateUserPairIndexList(UserPairIndexList);
};
