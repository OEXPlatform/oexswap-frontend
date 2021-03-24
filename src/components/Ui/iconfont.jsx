import React from 'react';
import cx from 'classnames';

export function Iconfont(props) {
  const style = Object.assign({}, props.style);
  if (props.primary) style.color = '#00c9a7';
  return (
    <svg className={cx('iconfont', props.className, 'icon-' + props.icon)} onClick={props.onClick} aria-hidden="true" style={style}>
      <use href={'#icon-' + props.icon}></use>
    </svg>
  );
}
