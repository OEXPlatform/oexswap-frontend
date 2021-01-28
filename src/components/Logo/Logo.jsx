import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as oexchain from 'oex-web3';
import { T } from '../../utils/lang';

export default class Logo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      networkType: T('私网'),
    };
  }
  componentDidMount = () => {
    oexchain.oex.getChainConfig().then((chainConfig) => {
      let networkType = T('私网');
      if (chainConfig.chainId == 1) {
        networkType = T('主网');
      } else if (chainConfig.chainId >= 100 && chainConfig.chainId <= 200) {
        networkType = T('测试网');
      }
      this.setState({ networkType });
    });
  };
  render() {
    return (
      <Link to="/" className="logo">
        <svg className="iconfont" aria-hidden="true">
          <use href="#icon-oex"></use>
        </svg>
        <div to="/" className="logo-text">
          OEX Swap
        </div>
      </Link>
    );
  }
}
