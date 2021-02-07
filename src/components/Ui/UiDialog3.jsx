import React from 'react';
import { Dialog } from '@icedesign/base';
import cx from 'classnames';
import { Iconfont } from './iconfont';

export function UiDialog3({ children, header, title, visible, className, onCancel, titleIcon }) {
  return (
    <Dialog className="ui-dialog3" hasMask={false} footer={false} closeable={true} visible={visible}>
      <div className={cx('ui-dialog-content', className)}>
        <div className="ui-dialog-body">
          <div className="ui-dialog-header">
            <Iconfont className="ui-out" onClick={onCancel} icon="out"></Iconfont>
            {titleIcon}
            <div className="ui-dialog-title">{title}</div>
          </div>
          {children}
        </div>
      </div>
    </Dialog>
  );
}
