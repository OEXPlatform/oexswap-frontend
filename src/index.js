import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { Feedback } from '@icedesign/base';
import * as oexchain from 'oex-web3';
import './data/app';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';

import router from './router';
import configureStore from './configureStore';
import cookie from 'react-cookies';
import { setLang } from './utils/lang';
import * as constant from './utils/constant';

const defaultLang = cookie.load('defaultLang');
if (defaultLang != null) {
  setLang(defaultLang);
}

// Create redux store with history
const initialState = {};
const history = createBrowserHistory();
const store = configureStore(initialState, history);
const ICE_CONTAINER = document.getElementById('ice-container');

//oexchain.utils.setProvider("http://8.210.200.219:8080");
// let nodeInfo = cookie.load('nodeInfo');
// if (nodeInfo != null && nodeInfo !== '') {
//   axios.defaults.baseURL = nodeInfo;
//   await oexchain.utils.setProvider(nodeInfo);
// } else {
//   nodeInfo = 'https://' + window.location.host + (window.location.host.indexOf(':') > 0 ? '' : ':8081');
//   cookie.save('nodeInfo', nodeInfo, {path: '/', maxAge: 3600 * 24 * 360});
//   await oexchain.utils.setProvider(nodeInfo);
// }

if (!window.localStorage) {
  Feedback.toast.warn(T('请升级浏览器，当前浏览器无法保存交易结果'));
}
if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>{router()}</ConnectedRouter>
  </Provider>,
  ICE_CONTAINER
);
