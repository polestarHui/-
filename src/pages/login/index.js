import React from 'react';
import style from './style.less';
import userImg from '../../../asset/login/user.svg';
import pasImg from '../../../asset/login/pas.svg';
import { history } from 'umi';
import $ from 'jquery';
import { message } from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  // 首页
  goHome = (isUser, e) => {
    if (isUser == 'user') {
      if ($('#account').val().length > 0 && $('#password').val().length > 0) {
        message.success('登录成功');
        history.push('/home');
      } else {
        message.error('请输入账号或密码');
      }
    } else {
      message.warning('当前为游客模式');
      history.push('/home');
    }
  };
  render() {
    return (
      <div className={style.loginWrap}>
        <div className={style.contentWrap}>
          <div className={style.title}>河北省地矿局第八地质大队云计算平台</div>
          <div className={style.contentBox}>
            <div className={style.userNumber}>
              <div className={style.item}>
                <img src={userImg} atl="用户"></img>
                <input id="account" placeholder="请输入账号"></input>
              </div>
              <div className={style.item}>
                <img src={pasImg} atl="密码"></img>
                <input
                  type="password"
                  id="password"
                  placeholder="请输入密码"
                ></input>
              </div>
            </div>
            <div className={style.optionItem}>忘记密码 | 注册</div>
            <div className={style.itemBtn}>
              <div onClick={this.goHome.bind(this, 'user')}>登录</div>
              <div onClick={this.goHome.bind(this, 'tourist')}>游客登录</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
