import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as oexchain from 'oex-web3';
import { T } from '../../utils/lang';
import { Iconfont } from '../Ui/iconfont';
import './index.scss';
import cx from 'classnames';
import eventProxy from '../../utils/eventProxy';
import { AppData } from '../../data/app';

export default class MinerInfo extends PureComponent {
  state = {
    rightBig: false,
    CurrentBlock: AppData.CurrentBlock,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    eventProxy.on('AppData:CurrentBlock', (CurrentBlock) => {
      this.setState({ CurrentBlock });
    });
  };
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
              <h4>108</h4>
              <p>当前周期</p>
              <h4 style={{ marginTop: '20px' }}>{CurrentBlock}</h4>
              <p>当前区块高度</p>
              <h4 style={{ marginTop: '20px' }}>100 OEX</h4>
              <p>当前区块奖励</p>
            </div>
            <div className="ui-miner-block ui-fr">
              <h4 style={{ marginTop: '80px' }}>100 OEX</h4>
              <p>我的挖矿奖励</p>
              <div style={{ marginTop: '32px' }} className="ui-btn">
                提取
              </div>
            </div>
          </div>
          <div className="ui-miner-right ui-fr">
            <div className="ui-miner-block ui-fr ui-clearfix">
              <Iconfont onClick={() => this.setState({ rightBig: !this.state.rightBig })} icon={this.state.rightBig ? 'full-exit' : 'full'}></Iconfont>
              <div className="ui-fl">
                <h5>12 人</h5>
                <p>一级邀请 ｜ 20% OEX</p>
                <h5 style={{ marginTop: '20px' }}>360 人</h5>
                <p>二级邀请 ｜ 10% OEX</p>
                <div style={{ marginTop: '47px' }} className="ui-btn">
                  复制邀请链接
                </div>
              </div>
              <div className="ui-fr">
                <h6>100 OEX</h6>
                <p>一级矿池奖励</p>
                <h6 style={{ marginTop: '12px' }}>2000 OEX</h6>
                <p>二级矿池奖励</p>
                <div style={{ marginTop: '20px' }} className="ui-total">
                  合计：2100 OEX
                </div>
                <div style={{ marginTop: '18px' }} className="ui-btn">
                  提取奖励
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui-desc ui-miner-line-bottom">
          <h3>OEXSWAP 邀请挖矿参与细则</h3>
          <div>
            此外，在OEXSWAP基础上社区推出邀请挖矿，即通过邀请链接邀请他人注册可额外获得20%的OEX。设立总量最高为9,720,000个OEX的“邀
            请挖矿奖金池”，所有OEX奖励同样从oexliquidity账户（OEX流动性账户）支出，不额外增发OEX。
            例如，A邀请B参与交易挖矿，A账户除了可以获得自己交易挖矿应得的奖励，还可以额外获得B账户交易挖矿奖励的20%作为其邀请挖矿奖励，
            且B账户所获交易挖矿奖励不变，A账户所获邀请挖矿奖励从“邀请挖矿奖金池”中支出。 如果B又邀请了C，则B账户可额外获得C账
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
