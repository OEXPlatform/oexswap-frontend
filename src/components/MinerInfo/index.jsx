import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { T } from '../../utils/lang';
import { Iconfont } from '../Ui/iconfont';
import './index.scss';
import cx from 'classnames';
import eventProxy from '../../utils/eventProxy';
import { AppData } from '../../data/app';
import * as oexchain from 'oex-web3';
import * as utils from '../../utils/utils';
import BigNumber from 'bignumber.js';
import * as Constant from '../../utils/constant';
import copy from 'copy-to-clipboard';
import { Icon, Select, Dialog, Feedback, Grid } from '@icedesign/base';
import { sleep } from '../../utils/notification';
import { getAccountInfoById } from '../../utils/oexSDK';

const zero = new BigNumber(0);
const otherTokenLogo = require('../../pages/OexSwap/images/default-logo.png');

// upAccount2Accout2RewardMap

export default class MinerInfo extends PureComponent {
  state = {
    desc: [
      { title: 'OEXSWAP 交易对创建规则', content: () => <div className="ui-desc-ct">{T('miningText1')}</div> },
      {
        title: 'OEXSWAP 交易挖矿产出计划',
        content: () => (
          <div className="ui-desc-ct">
            {T('miningTtile2')}
            <br />
            <br />
            {T('miningTtile3')}
            <br />
            <br />
            {T('miningTtile4')}
            <br />
            <br />
            {T('miningTtile5')}
            <br />
            <br />
            {T('miningTtile6')}
            <br />
            <br />
            {T('miningTtile7')}
          </div>
        ),
      },
      {
        title: 'OEXSWAP 交易挖矿参与细则',
        content: () => (
          <div className="ui-desc-ct">
            {T('miningTtile8')}
            <br />
            <br />
            {T('miningTtile9')}
            <br />
            <br />
            {T('miningTtile10')}
            <br />
            <br />
            {T('miningTtile11')}
          </div>
        ),
      },
      {
        title: 'OEXSWAP 雇佣挖矿参与细则',
        content: () => (
          <div className="ui-desc-ct">
            {T('miningTtile12')}
            {T('miningTtile13')}
            <br />
            <br />
            {T('miningTtile14')}
            {T('miningTtile15')}
          </div>
        ),
      },
    ],
    descShow: {},
    rightBig: false,
    CurrentBlock: AppData.CurrentBlock,
    NextValidCandidates: AppData.NextValidCandidates,
    PerBlockReward: zero,
    pendingSpreadReward: zero,
    accountSpreadRewardMap: zero,
    accountSecondSpreadRewardMap: zero,
    accountAmountMap: zero,
    getDownAccountsNumber: 0,
    getDownAccountsNumber2: 0,
    SpreaDetail: '',
    SpreaDetailLast: 0,
    SpreaDetailList: [],
  };
  timer = null;
  constructor(props) {
    super(props);
    const account = utils.getDataFromFile(Constant.AccountObj);
    this.state.account = account;
  }
  componentDidMount = async () => {
    eventProxy.on('AppData:CurrentBlock', (CurrentBlock) => this.setState({ CurrentBlock }));
    eventProxy.on('AppData:NextValidCandidates', (NextValidCandidates) => this.setState({ NextValidCandidates }));
    this.getUserSpread();
    this.timer = setInterval(() => {
      this.getUserSpread();
    }, 5000);
    this.getSpreadNum();
    await AppData.mounted;
    this.getPerBlockReward();
  };
  componentWillUnmount() {
    clearInterval(this.timer);
    this.updateDetailStepGoIndex = 0;
  }
  // 获取当前区块奖励值
  async getPerBlockReward() {
    const payloadInfo = { funcName: 'getReward', types: ['uint256'], values: [this.state.CurrentBlock.number] };
    const res = await oexchain.action.readContract(Constant.oexswapminer, Constant.oexswapminer, payloadInfo, 'latest');
    const parse = utils.parseResult(['uint256'], res);
    this.setState({ PerBlockReward: new BigNumber(parse[0]._hex).shiftedBy(-18) });
  }
  // 获取当前用户推广挖矿信息
  async getUserSpread() {
    const account = utils.getDataFromFile(Constant.AccountObj);
    this.state.account = account;
    if (!this.state.account) return;
    const name = this.state.account.accountName;
    oexchain.action.readContract(name, Constant.oexswapminer, { funcName: 'pendingSpreadReward', types: [], values: [] }, 'latest').then((res) => {
      const parse = utils.parseResult(['uint256'], res);
      this.setState({ pendingSpreadReward: new BigNumber(parse[0]._hex).shiftedBy(-18) });
    });
    oexchain.action.readContract(name, Constant.oexswapminer, { funcName: 'accountSpreadRewardMap', types: ['address'], values: [account.accountID] }, 'latest').then((res) => {
      const parse = utils.parseResult(['uint256'], res);
      this.setState({ accountSpreadRewardMap: new BigNumber(parse[0]._hex).shiftedBy(-18) });
    });
    oexchain.action.readContract(name, Constant.oexswapminer, { funcName: 'accountSecondSpreadRewardMap', types: ['address'], values: [account.accountID] }, 'latest').then((res) => {
      const parse = utils.parseResult(['uint256'], res);
      this.setState({ accountSecondSpreadRewardMap: new BigNumber(parse[0]._hex).shiftedBy(-18) });
    });
    oexchain.action.readContract(name, Constant.oexswapminer, { funcName: 'accountAmountMap', types: ['address'], values: [account.accountID] }, 'latest').then((res) => {
      const parse = utils.parseResult(['uint256'], res);
      this.setState({ accountAmountMap: new BigNumber(parse[0]._hex).shiftedBy(-18) });
    });
  }
  // 获取推广人数
  async getSpreadNum() {
    const account = utils.getDataFromFile(Constant.AccountObj);
    this.state.account = account;
    if (!this.state.account) return;
    const name = this.state.account.accountName;
    oexchain.action.readContract(name, Constant.swapspread, { funcName: 'getDownAccountsNumber', types: ['address'], values: [account.accountID] }, 'latest').then((res) => {
      const parse = utils.parseResult(['uint256'], res);
      this.setState({ getDownAccountsNumber: new BigNumber(parse[0]._hex).toNumber() });
    });
    oexchain.action.readContract(name, Constant.swapspreadhp, { funcName: 'getDownAccountsNumber2', types: ['address'], values: [account.accountID] }, 'latest').then((res) => {
      const parse = utils.parseResult(['uint256'], res);
      this.setState({ getDownAccountsNumber2: new BigNumber(parse[0]._hex).toNumber() });
    });
  }
  async ViewSpreadDetail() {
    this.setState({ rightBig: !this.state.rightBig });
    if (this.state.rightBig) {
      this.setState({ SpreaDetail: '' });
      return;
    }
    if (this.state.SpreaDetailList.length > 0) return this.renderDetail();
    this.updateDetailStep(0, ++this.updateDetailStepGoIndex);
  }

  updateDetailStepGoIndex = 0;
  async updateDetailStep(index, updateDetailStepGoIndex) {
    if (index === 0) {
      this.setState({ SpreaDetail: <div className="ui-detail-info"></div> });
      this.state.SpreaDetailList = [];
      this.state.SpreaDetailLast = 0;
    }
    if (updateDetailStepGoIndex !== this.updateDetailStepGoIndex) return; // 非生命周期内
    const account = utils.getDataFromFile(Constant.AccountObj);
    if (!account) return;
    oexchain.action
      .readContract(Constant.oexswapminerhp, Constant.oexswapminerhp, { funcName: 'getSpreadInfoByIndex', types: ['address', 'uint256'], values: [account.accountID, index] }, 'latest')
      .then((res) => {
        if (!res || res === '0x' || res === '0X') {
          this.state.SpreaDetailLast = this.state.SpreaDetailList.length;
          return;
        }
        const parse = utils.parseResult(['address', 'uint256', 'uint256'], res);
        let [id, reward, deep] = parse.map((item) => {
          if (typeof item === 'number') return new BigNumber(item);
          if (typeof item === 'string') return new BigNumber(item.toLocaleLowerCase());
          if (item && item._hex) return new BigNumber(item._hex);
          return new BigNumber(item);
        });
        id = id.toNumber();
        reward = reward.shiftedBy(-18).toFixed(2);
        deep = deep.toNumber();
        if (id === 0) {
          this.state.SpreaDetailLast = this.state.SpreaDetailList.length;
          return;
        }
        const detail = { id, reward, deep, account: null };
        this.state.SpreaDetailList.push(detail);
        getAccountInfoById(id).then((res) => {
          detail.account = res;
          this.renderDetail();
        });
        this.renderDetail();
        const next = index + 1;
        if (next >= this.state.SpreaDetailLast + 10) return;
        this.updateDetailStep(next, updateDetailStepGoIndex);
      });
  }
  SpreaDetailMore() {
    this.state.SpreaDetailLast = this.state.SpreaDetailLast + 10;
    this.updateDetailStep(this.state.SpreaDetailList.length + 1, this.updateDetailStepGoIndex);
  }
  renderDetail() {
    this.setState({
      SpreaDetail: (
        <div className="ui-detail-info">
          {this.state.SpreaDetailList.map(({ id, reward, deep, account }) => {
            return (
              <div key={id}>
                <img src={otherTokenLogo}></img>
                <div className="ui-speard-detail-id">{account ? account.accountName : id}</div>
                <div className="ui-speard-detail-reward">
                  <span>+</span>
                  {reward} <span>OEX</span>
                </div>
                <div className="ui-speard-detail-deep" deep={deep}>
                  {deep === 1 ? '一级矿工' : '二级矿工'}
                </div>
              </div>
            );
          })}
          {this.state.SpreaDetailList.length === this.state.SpreaDetailLast + 10 && (
            <div onClick={() => this.SpreaDetailMore()} className="ui-load-more">
              加载更多
            </div>
          )}
        </div>
      ),
    });
  }
  copySpeard = () => {
    const account = utils.getDataFromFile(Constant.AccountObj);
    if (!account) return;
    copy('https://app.oexswap.com/index.html#/downapp?icode=' + account.accountID);
    Feedback.toast.success(T('已复制到粘贴板'));
  };

  async invitationHarvest() {
    eventProxy.trigger('MinerInfo:invitationHarvest');
  }
  async harvest() {
    eventProxy.trigger('MinerInfo:harvest');
  }

  toggleDesc(index) {
    const descShow = this.state.descShow;
    if (descShow[index]) {
      delete descShow[index];
    } else {
      descShow[index] = true;
    }
    this.setState({ descShow: JSON.parse(JSON.stringify(descShow)) });
  }
  render() {
    return (
      <div className={this.state.rightBig ? 'ui-miner ui-miner-full' : 'ui-miner'}>
        <div className="ui-miner-line-bottom ui-clearfix" style={{ paddingBottom: '16px', position: 'relative' }}>
          <div className="ui-miner-left ui-clearfix ui-fl">
            <div className="ui-miner-block ui-fl">
              <h4>{this.state.NextValidCandidates.preEpoch}</h4>
              <p>{T('当前周期')}</p>
              <h4 style={{ marginTop: '20px' }}>{this.state.CurrentBlock.number}</h4>
              <p>{T('当前区块高度')}</p>
              <h4 style={{ marginTop: '20px' }}>{this.state.PerBlockReward.toFixed(0)} OEX</h4>
              <p>{T('当前区块奖励')}</p>
            </div>
            <div className="ui-miner-block ui-fr">
              <h4>{this.state.accountAmountMap.toFixed(2)} OEX</h4>
              <p>{T('我的挖矿奖励')}</p>
              <div style={{ marginTop: '32px' }} onClick={() => this.harvest()} className="ui-btn">
                {T('提取')}
              </div>
            </div>
          </div>
          <div className="ui-miner-right ui-fr">
            <div className="ui-miner-block ui-fr ui-clearfix">
              <Iconfont onClick={() => this.ViewSpreadDetail()} icon={this.state.rightBig ? 'full-exit' : 'full'}></Iconfont>
              <div className="ui-fl">
                <h5>{this.state.getDownAccountsNumber} 人</h5>
                <p>{T('一级邀请')} ｜ 20% OEX</p>
                <h5 style={{ marginTop: '20px' }}>{this.state.getDownAccountsNumber2} 人</h5>
                <p>{T('二级邀请')} ｜ 10% OEX</p>
                <div style={{ marginTop: '47px' }} onClick={() => this.copySpeard()} className="ui-btn">
                  {T('复制邀请链接')}
                </div>
              </div>
              <div className="ui-fr">
                <h6 style={{ marginTop: '70px' }}>{this.state.pendingSpreadReward.toFixed(2)} OEX</h6>
                <p style={{ marginBottom: '24px' }}>{T('一、二级雇佣奖励')}</p>
                {/* <h6 style={{ marginTop: '12px' }}>{this.state.accountSecondSpreadRewardMap.toFixed(2)} OEX</h6>
                <p>二级矿池奖励</p>
                <div style={{ marginTop: '20px' }} className="ui-total">
                  合计：{this.state.pendingSpreadReward.toFixed(2)} OEX
                </div> */}
                <div style={{ marginTop: '18px' }} onClick={() => this.invitationHarvest()} className="ui-btn">
                  {T('提取奖励')}
                </div>
              </div>
              {this.state.SpreaDetail}
            </div>
          </div>
        </div>
        {this.state.desc.map((item, index) => {
          return (
            <div className={cx('ui-desc ui-miner-line-bottom', { 'ui-show': this.state.descShow[index] })} key={item.title}>
              <h3 onClick={this.toggleDesc.bind(this, index)}>
                {T(item.title)}
                <img src="/img/right.png" />
              </h3>
              {item.content()}
            </div>
          );
        })}
        <div></div>
      </div>
    );
  }
}
