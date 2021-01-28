/* eslint-disable prefer-template */
/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { PureComponent } from 'react';
import { Icon, Select, Dialog, Feedback, Grid } from '@icedesign/base';
import Layout from '@icedesign/layout';
import StyledMenu, { Item as MenuItem, SubMenu } from '@icedesign/styled-menu';

import { Input, Button, Balloon } from '@alifd/next';
import cookie from 'react-cookies';
import axios from 'axios';
import { createHashHistory } from 'history';
import cx from 'classnames';
import copy from 'copy-to-clipboard';
import { Link } from 'react-router-dom';
import * as oexchain from 'oex-web3';
import { ethers } from 'ethers';
import EthCrypto, { sign } from 'eth-crypto';
import * as ethUtil from 'ethereumjs-util';
import { headerMenuConfig } from '../../menuConfig';
import Logo from '../Logo';
import * as utils from '../../utils/utils';
import * as constant from '../../utils/constant';
import { T, setLang } from '../../utils/lang';
import eventProxy from '../../utils/eventProxy';
import BigNumber from 'bignumber.js';
import './scss/ui.scss';
import { Iconfont } from '../iconfont';
import { UiDialog } from '../UiDialog';

// import { BigNumber } from 'ethers/utils';
const { Row } = Grid;
export const history = createHashHistory();
const keyMap = { dashboard: '0', Block: '1', Transaction: '2', assetOperator: '3', contractDev: '4', producerList: '5' };

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    const nodeInfoCookie = cookie.load('nodeInfo');
    const defaultLang = cookie.load('defaultLang');

    let nodeInfo = nodeInfoCookie;
    if (utils.isEmptyObj(nodeInfo)) {
      nodeInfo = constant.mainNetRPCHttpsAddr;
    }
    const account = utils.getDataFromFile(constant.AccountObj);

    var upAccountId = 0;
    const index = window.location.href.indexOf('?id=');
    if (index > -1) upAccountId = parseInt(window.location.href.substr(index + 4));

    this.state = {
      spreadContractName: 'spreadtest002',
      minerContractName: 'oexminertest015',
      upAccountId,
      txInfoVisible: false,
      current: keyMap[props.location.pathname.substr(1)],
      nodeConfigVisible: false,
      accountConfigVisible: false,
      spreadInfoDialogVisible: false,
      account: account,
      accountName: account != null ? account.accountName : '',
      privateKey: '',
      password: '',
      nodeInfo,
      chainId: 0,
      sysTokenID: 0,
      callbackFunc: null,
      customNodeDisabled: true,
      spreadInfo: { yourUrl: account == null ? '登录账户后才能生成您的推广链接' : 'https://oexswap.com?id=' + account.accountID, downAccountNum: 0, downAccountNames: [], totalReward: 0 },
      languages: [
        { value: 'ch', label: '中文' },
        { value: 'en', label: 'English' },
      ],
      curLang: defaultLang == null || defaultLang == 'ch' ? 'English' : '中文',
      defaultLang,
      nodes: [
        { value: constant.mainNet1RPCHttpsAddr, label: T('主网1：') + constant.mainNet1RPCHttpsAddr },
        { value: constant.mainNet2RPCHttpsAddr, label: T('主网2：') + constant.mainNet2RPCHttpsAddr },
        { value: 'others', label: T('自定义') },
      ],
    };
    setLang(this.state.defaultLang);
  }
  componentDidMount = async () => {
    let nodeInfo = cookie.load('nodeInfo');
    await oexchain.utils.setProvider(nodeInfo);

    oexchain.oex.getChainConfig().then((chainConfig) => {
      this.setState({ chainId: chainConfig.chainId });
      oexchain.oex.setChainConfig(chainConfig).then(() => {
        if (this.state.account != null) {
          this.getTotalReward(this.state.account.accountID).then((totalReward) => (this.state.spreadInfo.totalReward = totalReward));
          this.getDownAccountsNumber(this.state.account.accountID).then((number) => {
            this.state.spreadInfo.downAccountNum = number;
            for (var i = 0; i < number; i++) {
              this.getDownAccount(this.state.account.accountID, i).then((accountId) => {
                oexchain.account.getAccountById(accountId).then((account) => {
                  if (account != null) {
                    this.state.spreadInfo.downAccountNames.push(account.accountName);
                  }
                });
              });
            }
          });
        }
      });
    });
    eventProxy.on('importAccountInfo', () => {
      this.setState({ accountConfigVisible: true });
    });
    if (this.state.accountName == '') {
      this.setState({ accountConfigVisible: true });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ current: keyMap[nextProps.location.pathname.substr(1)] });
  }

  getTotalReward = async (accountId) => {
    let payloadInfo = { funcName: 'accountSpreadRewardMap', types: ['address'], values: [accountId] }; // types和values即合约方法的参数类型和值
    const totalReward = await oexchain.action.readContract(this.state.accountName, this.state.minerContractName, payloadInfo, 'latest');
    return new BigNumber(totalReward).shiftedBy(-18).toNumber();
  };

  getUpAccount = async (accountId) => {
    let payloadInfo = { funcName: 'getUpAccount', types: ['address'], values: [accountId] }; // types和values即合约方法的参数类型和值
    const upAccountId = await oexchain.action.readContract(this.state.accountName, this.state.spreadContractName, payloadInfo, 'latest');
    return upAccountId == '0x' ? 0 : new BigNumber(upAccountId).toNumber();
  };

  getDownAccountsNumber = async (accountId) => {
    let payloadInfo = { funcName: 'getDownAccountsNumber', types: ['address'], values: [accountId] }; // types和values即合约方法的参数类型和值
    const number = await oexchain.action.readContract(this.state.accountName, this.state.spreadContractName, payloadInfo, 'latest');
    return new BigNumber(number).toNumber();
  };

  getDownAccount = async (accountId, index) => {
    let payloadInfo = { funcName: 'getDownAccount', types: ['address', 'uint'], values: [accountId, index] }; // types和values即合约方法的参数类型和值
    const number = await oexchain.action.readContract(this.state.accountName, this.state.spreadContractName, payloadInfo, 'latest');
    return new BigNumber(number).toNumber();
  };

  registerUpAccount = async (gasInfo, privateKey) => {
    const { accountName, contractName } = this.state;
    let actionInfo = { accountName, toAccountName: this.state.spreadContractName, assetId: 0, amount: new BigNumber(0), remark: '' };

    let payloadInfo = { funcName: 'registerUpAccount', types: ['address'], values: ['0x' + new BigNumber(this.state.upAccountId).toString(16)] };

    return oexchain.action.executeContract(actionInfo, gasInfo, payloadInfo, privateKey);
  };

  openSetDialog = () => {
    this.setState({ nodeConfigVisible: true });
  };
  handleNodeInfoChange = (v) => {
    this.state.nodeInfo = v;
  };
  onChangeLanguage = () => {
    let languageType = 'ch';
    if (this.state.curLang == 'English') {
      languageType = 'en';
    }
    cookie.save('defaultLang', languageType, { path: '/', maxAge: 3600 * 24 * 360 });
    setLang(languageType);
    history.go(0);
    //    history.push('/');
  };
  onChangeNode = (type, value) => {
    cookie.save('defaultNode', value, { path: '/', maxAge: 3600 * 24 * 360 });
    this.setState({ customNodeDisabled: value != 'others', nodeInfo: value });
  };
  onConfigNodeOK = async () => {
    const nodeInfo = this.state.nodeInfo.indexOf('http://') == 0 || this.state.nodeInfo.indexOf('https://') == 0 ? this.state.nodeInfo : 'http://' + this.state.nodeInfo;
    cookie.save('nodeInfo', nodeInfo, { path: '/', maxAge: 3600 * 24 * 360 });
    axios.defaults.baseURL = nodeInfo;
    await oexchain.utils.setProvider(nodeInfo);
    const chainConfig = await oexchain.oex.getChainConfig(false);
    this.setState({ nodeConfigVisible: false, nodeInfo, chainId: chainConfig.chainId });
    //location.reload(true);
  };

  onConfigAcountOK = () => {
    const { accountName, privateKey, password } = this.state;
    if (!ethUtil.isValidPrivate(Buffer.from(utils.hex2Bytes(privateKey)))) {
      Feedback.toast.error(T('无效私钥！'));
      return;
    }
    oexchain.account.getAccountByName(accountName).then((account) => {
      if (account != null) {
        const accountPublicKey = account['authors'][0]['owner'];
        var publicKey = EthCrypto.publicKeyByPrivateKey(privateKey);
        publicKey = utils.getPublicKeyWithPrefix(publicKey);
        if (accountPublicKey != publicKey) {
          Feedback.toast.error(T('账号同此私钥不匹配！'));
          return;
        }
        Feedback.toast.success(T('开始导入账户'));
        let wallet = new ethers.Wallet(privateKey);
        wallet
          .encrypt(password, null)
          .then((keystore) => {
            keystore = JSON.parse(keystore);
            keystore['publicKey'] = publicKey;
            utils.storeDataToFile(constant.AccountObj, account);
            utils.storeDataToFile(constant.KeyStore, keystore);
            Feedback.toast.success(T('成功导入账户'));
            this.setState({ accountConfigVisible: false, privateKey: '', password: '' });
            //
            if (this.state.upAccountId > 0) {
              oexchain.account.getAccountById(this.state.upAccountId).then((upAccount) => {
                if (upAccount != null) {
                  this.processUpAccount(account.accountID, privateKey).then((txhash) => {
                    console.log(txhash);
                    location.reload(true);
                  });
                } else {
                  location.reload(true);
                }
              });
            } else {
              location.reload(true);
            }
          })
          .catch((error) => Feedback.toast.error(T('账户导入失败')));
      } else {
        Feedback.toast.error(T('账户不存在'));
      }
    });
  };

  processUpAccount = async (accountId, privateKey) => {
    return this.getUpAccount(accountId).then((upAccountId) => {
      if (upAccountId == 0) {
        const gasInfo = { gasPrice: '0x' + new BigNumber(100).shiftedBy(9).toString(16), gasLimit: '0x' + new BigNumber(1000000).toString(16) };
        return this.registerUpAccount(gasInfo, privateKey);
      }
    });
  };

  handleAccountNameChange = (v) => {
    this.setState({ accountName: v });
  };

  handlePrivateKeyChange = (v) => {
    this.setState({ privateKey: v });
  };

  handlePasswordChange = (v) => {
    this.setState({ password: v });
  };

  handleUpAccountNameChange = (v) => {
    this.setState({ upAccountName: v });
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  manageAccount = () => {
    this.setState({
      accountConfigVisible: true,
    });
    //history.push('/AccountManager');
  };

  copyValue = (value) => {
    copy(value);
    Feedback.toast.success(T('已复制到粘贴板'));
  };

  render() {
    const defaultTrigger = (
      <Button text type="normal" style={{ color: '#808080', marginRight: '100px' }} onClick={this.openSetDialog.bind(this)}>
        <Iconfont style={{ marginRight: '8px', fontSize: '16px' }} icon="node" primary />
        {T('设置接入节点')}
      </Button>
    );
    const accountBtnTrigger = (
      <Button text type="normal" style={{ color: '#808080', marginRight: '30px' }} onClick={this.manageAccount.bind(this)}>
        <Iconfont icon="account" style={{ marginRight: '8px', fontSize: '16px' }} primary></Iconfont>
        {T('账号设置')}
      </Button>
    );
    const { isMobile, theme, width, className, style, location } = this.props;
    const { pathname } = location;

    return (
      <header theme={theme} className={cx('ui-layout-header')}>
        <Logo />
        {/* <div className="ui-layout-header-menu" style={{ display: 'flex' }}>
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <StyledMenu theme="light" onClick={this.handleClick} selectedKeys={[this.state.current]} style={{ fontSize: '14px' }} mode="horizontal">
              {headerMenuConfig.map((nav, idx) => {
                let subMenu = null;
                const linkProps = {};
                if (nav.children) {
                  subMenu = { items: [] };
                  subMenu.label = T(nav.name);
                  nav.children.map((item) => {
                    if (item.newWindow) {
                      subMenu.items.push({ value: item.name, href: item.path, target: '_blank' });
                    } else if (item.external) {
                      subMenu.items.push({ value: item.name, href: item.path });
                    } else {
                      subMenu.items.push({ value: item.name, to: item.path });
                    }
                  });
                } else if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                if (subMenu !== null) {
                  return (
                    <SubMenu title={<span>{subMenu.label}</span>} key={idx}>
                      {subMenu.items.map((item, i) => (
                        <MenuItem key={idx + '-' + i}>{item.to ? <Link to={item.to}>{item.value}</Link> : <a {...item}>{item.value}</a>}</MenuItem>
                      ))}
                    </SubMenu>
                  );
                }
                return <MenuItem key={idx}>{linkProps.to ? <Link {...linkProps}>{!isMobile ? T(nav.name) : null}</Link> : <a {...linkProps}>{!isMobile ? T(nav.name) : null}</a>}</MenuItem>;
              })}
            </StyledMenu>
          ) : null}
        </div> */}

        <div className="ui-layout-header-menu">
          <Balloon trigger={defaultTrigger} closable={false} style={{ color: '#5e768b' }}>
            {T('当前连接的节点')}:{this.state.nodeInfo}, ChainId:{this.state.chainId}
          </Balloon>
          <Balloon trigger={accountBtnTrigger} closable={false} style={{ color: '#5e768b' }}>
            {T('当前账号')}:{this.state.accountName == '' ? '尚未导入' : this.state.accountName}
          </Balloon>
          {/* <Button text type="normal" style={{color: '#808080', marginLeft: '30px'}} onClick={this.onChangeLanguage.bind(this)}>{this.state.curLang}</Button> */}
          <Button text type="normal" style={{ color: '#00C9A7', marginRight: '50px' }} onClick={() => this.setState({ spreadInfoDialogVisible: true })}>
            <Iconfont icon="gift" style={{ marginRight: '8px', fontSize: '16px' }} primary></Iconfont>
            邀请奖励
          </Button>
          <UiDialog
            className="ui-nodeInfo"
            visible={this.state.nodeConfigVisible}
            title={T('配置需连接的节点')}
            onOk={this.onConfigNodeOK.bind(this)}
            onCancel={() => this.setState({ nodeConfigVisible: false })}>
            <div className="ui-dialog-data">
              <Select
                language={T('zh-cn')}
                style={{ width: 400 }}
                placeholder={T('选择节点')}
                onChange={this.onChangeNode.bind(this, 'nodeInfo')}
                value={this.state.nodeInfo}
                defaultValue={constant.mainNet1RPCHttpsAddr}
                dataSource={this.state.nodes}
              />
              <br />
              <br />
              <Input
                hasClear
                disabled={this.state.customNodeDisabled}
                onChange={this.handleNodeInfoChange.bind(this)}
                style={{ width: 400 }}
                innerBefore="RPC URL"
                size="medium"
                defaultValue={this.state.nodeInfo}
                maxLength={150}
                hasLimitHint
              />
            </div>
          </UiDialog>

          <Dialog
            language={T('zh-cn')}
            visible={this.state.accountConfigVisible}
            title={T('导入账号信息')}
            footerActions="ok"
            footerAlign="center"
            closeable="true"
            onOk={this.onConfigAcountOK.bind(this)}
            onCancel={() => this.setState({ accountConfigVisible: false })}
            onClose={() => this.setState({ accountConfigVisible: false })}>
            <Input
              hasClear
              onChange={this.handleAccountNameChange.bind(this)}
              style={{ width: 300 }}
              innerBefore={T('账号')}
              size="medium"
              value={this.state.accountName}
              maxLength={32}
              hasLimitHint
            />
            <br />
            <br />
            <Input
              hasClear
              onChange={this.handlePrivateKeyChange.bind(this)}
              style={{ width: 300 }}
              innerBefore={T('私钥')}
              size="medium"
              defaultValue={this.state.privateKey}
              maxLength={66}
              hasLimitHint
            />
            <br />
            <br />
            <Input
              htmlType="password"
              hasClear
              onPressEnter={this.onConfigAcountOK.bind(this)}
              onChange={this.handlePasswordChange.bind(this)}
              style={{ width: 300 }}
              innerBefore={T('密码')}
              size="medium"
              defaultValue={this.state.password}
              maxLength={30}
              hasLimitHint
            />
          </Dialog>
          <Dialog
            style={{ width: '600px', padding: 0, color: 'white' }}
            visible={this.state.spreadInfoDialogVisible}
            title="推广信息"
            footerAlign="center"
            closeable="esc,mask,close"
            onOk={() => this.setState({ spreadInfoDialogVisible: false })}
            onCancel={() => this.setState({ spreadInfoDialogVisible: false })}
            onClose={() => this.setState({ spreadInfoDialogVisible: false })}>
            <Row style={{ color: 'white', marginLeft: '10px', marginTop: '10px', alignItems: 'center' }}>
              您的推广链接: {this.state.spreadInfo.yourUrl}
              <Button type="primary" style={{ marginLeft: '10px', borderRadius: '10px' }} onClick={() => this.copyValue(this.state.spreadInfo.yourUrl)}>
                复制
              </Button>
            </Row>
            <Row style={{ color: 'white', margin: '20px 0 0 10px', alignItems: 'center' }}>总推广用户数: {this.state.spreadInfo.downAccountNum}</Row>
            <Row style={{ color: 'white', marginLeft: '20px', marginTop: '10px' }}>{this.state.spreadInfo.downAccountNames.map((name) => name + ', ')}</Row>

            <Row style={{ color: 'white', margin: '20px 0 0 10px', alignItems: 'center' }}>推广奖励: {this.state.spreadInfo.totalReward}</Row>
          </Dialog>
        </div>
      </header>
    );
  }
}
