import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as oexchain from 'oex-web3';
import { T } from '../../utils/lang';
import { Iconfont } from '../Ui/iconfont';
import './index.scss';
import cx from 'classnames';

export default class MinerInfo extends PureComponent {
  state = {
    desc: [
      {
        title: 'OEXSWAP 交易对创建规则',
        content: () => (
          <div className="ui-desc-ct">
            Token的链上持有账户地址数≥100方可创建包含该token的交易对。
            <br />
            <span className="ui-primary">[这个合约限制不了，合约只能判断过来交易的地址数有多少，如果要限制，需要前端来限制，但懂的用户可以直接绕过前端，直接调用合约接口， 防不住]</span>
            <br />
            例如，持有AA token的链上账户有100个，则可成功创建AA/OEX交易对；持有BB token的链上账户只有99个，则无法创建BB/OEX交易对。
          </div>
        ),
      },
      {
        title: 'OEXSWAP 交易挖矿产出计划',
        content: () => (
          <div className="ui-desc-ct">
            基本上没问题，不过只能是有发生交易的区块才能给OEX，没有交易的话就给不出去了
            <br />
            OEXSWAP 交易挖矿每个区块初始产出10个OEX，每90天为一个减半周期，共减半三次，每个周期出2,592,000个块。
            <br />
            <br />
            <div style={{ marginTop: '6px' }}>
              周期1：从区块高度<span className="ui-primary">X</span>开始，每个区块产出<span className="ui-primary">10</span>个OEX，计划产出<span className="ui-primary">25,920,000</span>个OEX
            </div>
            <div style={{ marginTop: '6px' }}>
              周期2：从区块高度<span className="ui-primary">X+2,592,000</span>开始，每个区块产出<span className="ui-primary">5</span>个OEX，计划产出<span className="ui-primary">12,960,000</span>
              个OEX。
            </div>
            <div style={{ marginTop: '6px' }}>
              周期3：从区块高度<span className="ui-primary">X+5,184,000</span>开始，每个区块产出<span className="ui-primary">2.5</span>个OEX，计划产出<span className="ui-primary">6,480,000</span>个OEX
            </div>
            <div style={{ marginTop: '6px' }}>
              周期4：从区块高度<span className="ui-primary">X+7,776,000</span>开始，每个区块产出<span className="ui-primary">1.25</span>个OEX，计划产出<span className="ui-primary">3,240,000</span>
              个OEX
            </div>
            <br />
            <div>交易挖矿持续时间360天，计划产出48,600,000个OEX。</div>
          </div>
        ),
      },
      {
        title: 'OEXSWAP 交易挖矿参与细则',
        content: () => (
          <div className="ui-desc-ct">
            1- 参与交易挖矿的交易对必须以OEX为锚。例如，AA token与OEX token组成的AA/OEX交易对可参与交易挖矿； 而AA token与BB token组成的AA/BB交易对无法参与交易挖矿。
            <br />
            <br />
            2- 该交易对的交易账号数≥10方能启动交易挖矿。例如，有10个账户用OEX交易了AA，则AA/OEX交易对自动参与交易挖矿； 只有9个账户用OEX交易了BB，则BB/OEX交易对无法参与交易挖矿。
            <br />
            <br />
            3- 每个账号按其交易量占比瓜分每个区块产出的OEX，交易量统计单位为OEX。例如，某区块产出的时间段内OEXSWAP总交易量为
            <br />
            <br />
            10000个OEX，甲账户交易量为100个OEX，则甲可分得该区块产出的OEX的1%，即可分得0.1个OEX。
            <br />
            <br />
            4- 交易挖矿奖金池总量最高为48,600,000个OEX，达到区块高度X+7,776,000时交易挖矿活动自动结束，所有OEX奖励从oexliquidity账户
            <br />
            <br />
            （OEX流动性账户）支出，不额外增发OEX。
          </div>
        ),
      },
      {
        title: 'OEXSWAP 邀请挖矿参与细则',
        content: () => (
          <div className="ui-desc-ct">
            此外，在OEXSWAP基础上社区推出邀请挖矿，即通过邀请链接邀请他人注册可额外获得20%的OEX。设立总量最高为9,720,000个OEX的“邀
            请挖矿奖金池”，所有OEX奖励同样从oexliquidity账户（OEX流动性账户）支出，不额外增发OEX。
            <br />
            <br />
            例如，A邀请B参与交易挖矿，A账户除了可以获得自己交易挖矿应得的奖励，还可以额外获得B账户交易挖矿奖励的20%作为其邀请挖矿奖励，
            且B账户所获交易挖矿奖励不变，A账户所获邀请挖矿奖励从“邀请挖矿奖金池”中支出。 如果B又邀请了C，则B账户可额外获得C账
          </div>
        ),
      },
    ],
    descShow: {},
    rightBig: false,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    //
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
              <h4 style={{ marginTop: '20px' }}>563643</h4>
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
        {this.state.desc.map((item, index) => {
          return (
            <div className={cx('ui-desc ui-miner-line-bottom', { 'ui-show': this.state.descShow[index] })} key={item.title}>
              <h3 onClick={this.toggleDesc.bind(this, index)}>
                {item.title}
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
