import React from 'react';
export function Iconfont(props) {
  const style = Object.assign({}, props.style);
  if (props.primary) style.color = '#00c9a7';
  return (
    <svg className="iconfont" aria-hidden="true" style={style}>
      <use href={'#icon-' + props.icon}></use>
    </svg>
  );
}
