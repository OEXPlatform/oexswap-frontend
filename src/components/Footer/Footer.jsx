import React, { PureComponent } from 'react';
import Layout from '@icedesign/layout';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import './ui.scss';

const PNG_f = require('./images/f.png');
const PNG_logo = require('./images/logo.png');
const PNG_ten = require('./images/t.en.png');
const PNG_tzh = require('./images/t.zh.png');
const PNG_t = require('./images/t.png');

export default class Footer extends PureComponent {
  render() {
    const { className, style } = this.props;
    return (
      <Layout.Footer className={cx('ui-layout-footer', className)} style={style}>
        <div className="ui-layout-footer-body">
          <div className="ui-footer">
            <a href="/">
              <img src={PNG_logo} />
            </a>
            <a style={{ right: 56 * 3 + 'px' }} href="http://t.me/oexfund">
              <img src={PNG_tzh} />
            </a>
            <a style={{ right: 56 * 2 + 'px' }} href="http://t.me/oexfunder">
              <img src={PNG_ten} />
            </a>
            <a style={{ right: 56 * 1 + 'px' }} href="https://www.facebook.com/fund.oex.7">
              <img src={PNG_f} />
            </a>
            <a style={{ right: '10px' }} href="https://twitter.com/Oex_team">
              <img src={PNG_t} />
            </a>
          </div>
        </div>
        <div className="uilayout-copyright">
          <span>© 2019 Theme designed by oex.com</span>
          <span className="line">|</span>
          <span>冀ICP备2020025490号</span>
          <span className="line">|</span>
          <span>oexfund@gmail.com</span>
        </div>
      </Layout.Footer>
    );
  }
}
