import React from 'react';
import style from './style.less';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.regionWrap}>
        <div className={style.leftPart}></div>
        <div className={style.rightPart}></div>
      </div>
    );
  }
}
