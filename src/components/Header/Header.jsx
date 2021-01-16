/* eslint-disable prefer-template */
/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { PureComponent } from 'react';
import { Icon, Select, Dialog, Feedback } from '@icedesign/base';
import Layout from '@icedesign/layout';
import StyledMenu, {
  Item as MenuItem,
  SubMenu
} from '@icedesign/styled-menu';

import { Input, Button, Balloon } from '@alifd/next';
import cookie from 'react-cookies';
import axios from 'axios';
import { createHashHistory } from 'history';
import cx from 'classnames';
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
import styles from './scss/base.scss';

export const history = createHashHistory();
const keyMap = {'dashboard': '0', 'Block': '1', 'Transaction': '2', 'assetOperator': '3', 'contractDev': '4', 'producerList': '5'};

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
    this.state = {
      current: keyMap[props.location.pathname.substr(1)],
      nodeConfigVisible: false,
      accountConfigVisible: false,
      accountName: account != null ? account.accountName : '',
      privateKey: '',
      password: '',
      nodeInfo,
      chainId: 0,
      customNodeDisabled: true,
      languages: [{value: 'ch', label:'中文'}, {value: 'en', label:'English'}],
      curLang: (defaultLang == null || defaultLang == 'ch') ? 'English' : '中文',
      defaultLang,
      nodes: [{value: constant.mainNet1RPCHttpsAddr, label:T('主网1：') + constant.mainNet1RPCHttpsAddr}, 
              {value: constant.mainNet2RPCHttpsAddr, label:T('主网2：') + constant.mainNet2RPCHttpsAddr}, 
              {value: 'others', label: T('自定义')}],
    };
    setLang(this.state.defaultLang);
  }
  componentDidMount = () => {
    oexchain.oex.getChainConfig().then(chainConfig => {
      this.setState({chainId: chainConfig.chainId});
    })
    eventProxy.on('importAccountInfo', () => {
      this.setState({accountConfigVisible: true});
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({current: keyMap[nextProps.location.pathname.substr(1)]});
  }

  openSetDialog = () => {
    this.setState({ nodeConfigVisible: true });
  }
  handleNodeInfoChange = (v) => {
    this.state.nodeInfo = v;
  }
  onChangeLanguage = () => {
    let languageType = 'ch';
    if (this.state.curLang == 'English') {
      languageType = 'en';
    }
    cookie.save('defaultLang', languageType, {path: '/', maxAge: 3600 * 24 * 360});
    setLang(languageType);
    history.go(0);
//    history.push('/');
  }
  onChangeNode = (type, value) => {
    cookie.save('defaultNode', value, {path: '/', maxAge: 3600 * 24 * 360});
    this.setState({customNodeDisabled: value != 'others', nodeInfo: value});
  }
  onConfigNodeOK = async () => {
    const nodeInfo = (this.state.nodeInfo.indexOf('http://') == 0 || this.state.nodeInfo.indexOf('https://') == 0) ? this.state.nodeInfo : 'http://' + this.state.nodeInfo;
    cookie.save('nodeInfo', nodeInfo, {path: '/', maxAge: 3600 * 24 * 360});
    axios.defaults.baseURL = nodeInfo;
    await oexchain.utils.setProvider(nodeInfo);
    const chainConfig = await oexchain.oex.getChainConfig(false);
    this.setState({ nodeConfigVisible: false, nodeInfo, chainId: chainConfig.chainId });
    //location.reload(true);
  }

  onConfigAcountOK = () => {
    const { accountName, privateKey, password } = this.state;
    if (!ethUtil.isValidPrivate(Buffer.from(utils.hex2Bytes(privateKey)))) {
      Feedback.toast.error(T('无效私钥！'));
      return;
    }
    oexchain.account.getAccountByName(accountName).then(account => {
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
        wallet.encrypt(password, null).then(keystore => {
          keystore = JSON.parse(keystore);
          keystore['publicKey'] = publicKey;
          utils.storeDataToFile(constant.AccountObj, account);
          utils.storeDataToFile(constant.KeyStore, keystore);
          Feedback.toast.success(T('成功导入账户'));
          this.setState({accountConfigVisible: false, privateKey: '', password: ''});
        }).catch(error => Feedback.toast.error(T('账户导入失败')));
      } else {
        Feedback.toast.error(T('账户不存在'));
      }
    });
  }

  handleAccountNameChange = (v) => {
    this.setState({accountName: v});
  }

  handlePrivateKeyChange = (v) => {
    this.setState({privateKey: v});
  }

  handlePasswordChange = (v) => {
    this.setState({password: v});
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  manageAccount = () => {
    this.setState({
      accountConfigVisible: true
    });
    //history.push('/AccountManager');
  }

  render() {
    const defaultTrigger = <Button text type="normal" style={{color: '#808080'}} onClick={this.openSetDialog.bind(this)}><Icon type="set" />{T('设置接入节点')}</Button>;
    const accountBtnTrigger = <Button text type="normal" style={{color: '#808080', marginLeft: '30px'}} onClick={this.manageAccount.bind(this)}><Icon type="account" />{T('账号设置')}</Button>
    const { isMobile, theme, width, className, style, location } = this.props;  
    const { pathname } = location;

    return (
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header')}
        //style={{ ...style, width }}
      >
      <Logo />  
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >   
        {
          headerMenuConfig && headerMenuConfig.length > 0 ? (
            <StyledMenu 
              theme='light'
              onClick={this.handleClick} 
              selectedKeys={[this.state.current]} 
              style={{fontSize: '14px'}}
              mode="horizontal"
            >
            {headerMenuConfig.map((nav, idx) => {
                let subMenu = null;
                const linkProps = {};
                if (nav.children) {
                  subMenu = {items: []};
                  subMenu.label = T(nav.name);
                  nav.children.map(item => {
                    if (item.newWindow) {
                      subMenu.items.push({value: item.name, href: item.path, target: '_blank'});
                    } else if (item.external) {
                      subMenu.items.push({value: item.name, href: item.path});
                    } else {
                      subMenu.items.push({value: item.name, to: item.path});
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
                  return (<SubMenu title={<span>{subMenu.label}</span>}  key={idx}>                                                  
                            {subMenu.items.map((item, i) => 
                              <MenuItem  key={idx + '-' + i}>
                                {item.to ? (
                                  <Link to={item.to}>
                                    {item.value}
                                  </Link>
                                ) : (
                                  <a {...item}>
                                    {item.value}
                                  </a>
                                )}
                              </MenuItem>)}
                          </SubMenu>);
                }
                return (
                  <MenuItem key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {!isMobile ? T(nav.name) : null}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {!isMobile ? T(nav.name) : null}
                      </a>
                    )}
                  </MenuItem>
                );
              })}
            </StyledMenu>
          ) : null
        }     
          
        </div>
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          <Balloon trigger={defaultTrigger} closable={false}>
            {T('当前连接的节点')}:{this.state.nodeInfo}, ChainId:{this.state.chainId}
          </Balloon>
          &nbsp;&nbsp;
          <Balloon trigger={accountBtnTrigger} closable={false}>
            {T('当前账号')}:{this.state.accountName == '' ? '尚未导入' : this.state.accountName}
          </Balloon>
          &nbsp;&nbsp;
          <Button text type="normal" style={{color: '#808080', marginLeft: '30px'}} onClick={this.onChangeLanguage.bind(this)}>{this.state.curLang}</Button>
          {/* &nbsp;&nbsp;
          <Select language={T('zh-cn')}
            style={{ width: 100 }}
            placeholder={T("语言")}
            onChange={this.onChangeLanguage.bind(this)}
            dataSource={this.state.languages}
            defaultValue={this.state.defaultLang}
          /> */}
          <Dialog language={T('zh-cn')}
            visible={this.state.nodeConfigVisible}
            title={T("配置需连接的节点")}
            footerActions="ok"
            footerAlign="center"
            closeable="true"
            onOk={this.onConfigNodeOK.bind(this)}
            onCancel={() => this.setState({ nodeConfigVisible: false })}
            onClose={() => this.setState({ nodeConfigVisible: false })}
          >
            <Select language={T('zh-cn')}
                style={{ width: 400 }}
                placeholder={T("选择节点")}
                onChange={this.onChangeNode.bind(this, 'nodeInfo')}
                value={this.state.nodeInfo}
                defaultValue={constant.mainNet1RPCHttpsAddr}
                dataSource={this.state.nodes}
            />
            <br />
            <br />
            <Input hasClear
              disabled={this.state.customNodeDisabled}
              onChange={this.handleNodeInfoChange.bind(this)}
              style={{ width: 400 }}
              innerBefore="RPC URL"
              size="medium"
              defaultValue={this.state.nodeInfo}
              maxLength={150}
              hasLimitHint
            />
          </Dialog>

          <Dialog language={T('zh-cn')}
            visible={this.state.accountConfigVisible}
            title={T("账号信息")}
            footerActions="ok"
            footerAlign="center"
            closeable="true"
            onOk={this.onConfigAcountOK.bind(this)}
            onCancel={() => this.setState({ accountConfigVisible: false })}
            onClose={() => this.setState({ accountConfigVisible: false })}
          >
            <Input hasClear
              onChange={this.handleAccountNameChange.bind(this)}
              style={{ width: 300 }}
              innerBefore={T("账号")}
              size="medium"
              value={this.state.accountName}
              maxLength={32}
              hasLimitHint
            />
            <br />
            <br />
            <Input hasClear
              onChange={this.handlePrivateKeyChange.bind(this)}
              style={{ width: 300 }}
              innerBefore={T("私钥")}
              size="medium"
              defaultValue={this.state.privateKey}
              maxLength={66}
              hasLimitHint
            />
            <br />
            <br />
            <Input htmlType="password" hasClear
              onChange={this.handlePasswordChange.bind(this)}
              style={{ width: 300 }}
              innerBefore={T("密码")}
              size="medium"
              defaultValue={this.state.password}
              maxLength={30}
              hasLimitHint
            />
          </Dialog>

          {/* <Search
            style={{ fontSize: '12px' }}
            size="large"
            inputWidth={400}
            searchText="Search"
            placeholder="Search by Address / Txhash / Block / Token / Ens"
          /> */}
          

          {/* Header 右侧内容块 */}

          {/* <Balloon
            visible={false}
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src={
                    profile.avatar ||
                    'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png'
                  }
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    {profile.name}
                  </span>
                  <br />
                  <span
                    className="user-department"
                    style={{ fontSize: '12px', color: '#999' }}
                  >
                    {profile.department}
                  </span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <FoundationSymbol type="person" size="small" />我的主页
              </li>
              <li className="user-profile-menu-item">
                <FoundationSymbol type="repair" size="small" />设置
              </li>
              <li
                className="user-profile-menu-item"
                onClick={this.props.handleLogout}
              >
                <FoundationSymbol type="compass" size="small" />退出
              </li>
            </ul>
          </Balloon> */}
        </div>
      </Layout.Header>
    );
  }
}
