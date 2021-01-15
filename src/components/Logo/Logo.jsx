import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as oexchain from 'oex-web3';
import { T } from '../../utils/lang';

const logo = require('./images/logo.png');
export default class Logo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      networkType: T('私网'),
    };
  }
  componentDidMount = () => {
    oexchain.oex.getChainConfig().then(chainConfig => {
      let networkType = T('私网');
      if (chainConfig.chainId == 1) {
        networkType = T('主网');
      } else if (chainConfig.chainId >= 100 && chainConfig.chainId <= 200) {
        networkType = T('测试网');
      }
      this.setState({networkType});
    })
  }
  render() {
    return (
      <div className="logo">
        <Link to="/" className="logo-text">
          OEXSwap
        </Link>
      </div>
    );
  }
}
