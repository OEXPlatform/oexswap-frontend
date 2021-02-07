import React from 'react';
import cx from 'classnames';
import { throttle } from '../../utils/throttle';
export class UiProgressControl extends React.Component {
  state = {
    value: 0,
    active: false,
  };
  constructor(props) {
    super(props);
    Object.assign(this.state, props);
  }

  onMouseDown(evt) {
    this.state.active = true;
    const offsetX = evt.clientX - evt.currentTarget.getBoundingClientRect().left;
    this.state.value = parseFloat(Math.max(Math.min(100, (offsetX / evt.currentTarget.offsetWidth) * 100), 0).toFixed(2), 10);
    // 点击的时候有引力效果，接近 0% 25% 50% 75% 100%；
    [0, 25, 50, 75, 100].forEach((val) => {
      if (this.state.value < val + 2 && this.state.value > val - 2) this.state.value = val;
    });
    this.update(evt);
  }

  onMouseMove(evt) {
    if (!this.state.active) return;
    const offsetX = evt.clientX - evt.currentTarget.getBoundingClientRect().left;
    this.state.value = parseFloat(Math.max(Math.min(100, (offsetX / evt.currentTarget.offsetWidth) * 100), 0).toFixed(2), 10);
    this.update(evt);
  }
  onMouseUp(evt) {
    this.state.active = false;
  }

  updateToParent = throttle(this.updateToParentThrottle, 100);
  updateToParentThrottle() {
    this.state.onUpdate(this.state.value);
  }
  update(evt) {
    evt.currentTarget.getElementsByClassName('ui-value')[0].style.right = 100 - this.state.value + '%';
    evt.currentTarget.getElementsByClassName('ui-radius')[1].style.backgroundColor = this.state.value >= 25 ? '#fc355f' : '#a4a4a4';
    evt.currentTarget.getElementsByClassName('ui-radius')[2].style.backgroundColor = this.state.value >= 50 ? '#fc355f' : '#a4a4a4';
    evt.currentTarget.getElementsByClassName('ui-radius')[3].style.backgroundColor = this.state.value >= 75 ? '#fc355f' : '#a4a4a4';
    evt.currentTarget.getElementsByClassName('ui-radius')[4].style.backgroundColor = this.state.value >= 100 ? '#fc355f' : '#a4a4a4';
    evt.currentTarget.getElementsByClassName('ui-value-show')[0].innerHTML = this.state.value + '%';
    this.updateToParent();
  }
  render() {
    const { className, value, style } = this.state;
    return (
      <div style={style} className={cx('ui-ProgressControl', className)} onMouseDown={this.onMouseDown.bind(this)} onMouseMove={this.onMouseMove.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
        <div className="ui-bar"></div>
        <div className="ui-radius" style={{ left: '0', backgroundColor: '#fc355f' }}></div>
        <div className="ui-radius" style={{ left: '25%', backgroundColor: value >= 25 ? '#fc355f' : '#a4a4a4' }}></div>
        <div className="ui-radius" style={{ left: '49%', backgroundColor: value >= 50 ? '#fc355f' : '#a4a4a4', marginLeft: '0' }}></div>
        <div className="ui-radius" style={{ right: '25%', backgroundColor: value >= 75 ? '#fc355f' : '#a4a4a4', marginLeft: '0', marginRight: '-4px' }}></div>
        <div className="ui-radius" style={{ right: '0', backgroundColor: value >= 100 ? '#fc355f' : '#a4a4a4', marginLeft: '0', marginRight: '-4px' }}></div>
        <div className="ui-value" style={{ right: 100 - value + '%' }}></div>
        <div className="ui-value-show">{value}%</div>
      </div>
    );
  }
}
