import React, { PureComponent } from 'react';
import Layout from '@icedesign/layout';
import { Link } from 'react-router-dom';
import cx from 'classnames';


const logo = require('./images/bottom_logo.png');

export default class Footer extends PureComponent {
  render() {
    const { className, style } = this.props;
    return (
      <Layout.Footer
        className={cx('ice-design-layout-footer', className)}
        style={{
          ...style,
        }}
      >
        <div className="ice-design-layout-footer-body">
          <div className="copyright">
            © 2019 Theme designed by oexchain.com
          </div>
        </div>
      </Layout.Footer>
    );
  }
}
