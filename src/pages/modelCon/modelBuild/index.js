import React from 'react';
import style from './style.less';
import worker from '../../../../asset/home/worker.png';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.regionWrap}>
        <img src={worker} alt="缺省图"></img>
        <div>页面维护中，敬请期待…………</div>
      </div>
    );
  }
}
