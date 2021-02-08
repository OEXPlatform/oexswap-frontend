import React from 'react';
import { Dialog } from '@icedesign/base';
import cx from 'classnames';
import { T } from '../../utils/lang';

export function UiDialog({ children, header, title, visible, className, onOk, onCancel, titleIcon }) {
  return (
    <Dialog className="ui-dialog" hasMask={false} footer={false} closeable={false} visible={visible}>
      <div className={cx('ui-dialog-content', className)}>
        <div className="ui-dialog-body">
          <div className="ui-dialog-header">
            {titleIcon}
            <div className="ui-dialog-title">{title}</div>
            {header}
          </div>
          {children}
          <div className="ui-dialog-btns">
            <div className="ui-submit" onClick={onOk}>
              {T('确 定')}
            </div>
            <div className="ui-cancel" onClick={onCancel}>
              {T('取 消')}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
