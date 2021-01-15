import React from 'react';
import { Notification } from '@alifd/next';
import BigNumber from 'bignumber.js';

export const OEXChainNetwork = 'https://oexchain.com/';

export function displayShortAddr(addr) {
  const simpleAddr = addr.substr(0, 12) + '...';
  return simpleAddr;
}

export function convert2BaseUnit(value) {
  return new BigNumber(value).shiftedBy(-18).toNumber();
}

export function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


export function displaySuccessInfo(successInfo) {
  Notification.config({placement: 'br'});
  Notification.open({
    title: '成功消息',
    content: successInfo,
    type: 'success',
    duration: 5000
  });
}

export function displayWarningInfo(warning) {
  Notification.config({placement: 'br'});
  Notification.open({
    title: '告警消息',
    content: warning,
    type: 'warning',
    duration: 5000
  });
}

export function displayErrorInfo(error) {
  Notification.config({placement: 'br'});
  Notification.open({
    title: '错误消息',
    content: error,
    type: 'error',
    duration: 10000
  });
}


const txNotificationKeyMap = {};

export function displayTxInfo(txId) {
  const content = <a href={OEXChainNetwork + '#/Transaction?' + txId} target='_blank'>交易已发送成功，点击此处可跳转到浏览器查看详情.</a>;
  Notification.config({placement: 'br'});
  const key = Notification.open({
      title: '交易发送结果',
      content,
      type: 'success',
      duration: 0,
      onClick: () => { 
        Notification.close(key); 
        txNotificationKeyMap[txId] = null;
      },
  });
  txNotificationKeyMap[txId] = key;
}

export function displayReceiptSuccessInfo(txId) {
  if (txNotificationKeyMap[txId] != null) {
    Notification.close(txNotificationKeyMap[txId]); 
  }
  const content = '交易（hash=' + displayShortAddr(txId) + '）已执行成功.';
  Notification.config({placement: 'br'});  
  const key = Notification.open({
      title: '交易执行结果',
      content,
      type: 'success',
      duration: 10000,
      onClick: () => { Notification.close(key); },
  });
}

export function displayReceiptFailInfo(txId) {
  if (txNotificationKeyMap[txId] != null) {
    Notification.close(txNotificationKeyMap[txId]); 
  }
  const content = <a href={OEXChainNetwork + '#/Transaction?' + txId} target='_blank'>
                    交易（hash= ' + {displayShortAddr(txId)} + '）执行失败，点击跳转到浏览器查看详情.'
                  </a>;
  Notification.config({placement: 'br'});
  const key = Notification.open({
      title: '交易执行结果',
      content,
      type: 'success',
      duration: 0,
      onClick: () => { Notification.close(key); },
  });
}

export function displayReceiptUnknownInfo(txId) {
  if (txNotificationKeyMap[txId] != null) {
    Notification.close(txNotificationKeyMap[txId]); 
  }
  const content = <a href={OEXChainNetwork + '#/Transaction?' + txId} target='_blank'>
                    未查询到交易（txHash= ' + {displayShortAddr(txId)} + '）执行结果，点击跳转到浏览器查看详情.'
                  </a>;
  Notification.config({placement: 'br'});
  const key = Notification.open({
      title: '交易执行结果',
      content,
      type: 'success',
      duration: 0,
      onClick: () => { Notification.close(key); },
  });
}

