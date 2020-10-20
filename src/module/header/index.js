import React from 'react';
import style from '../header/style.less';
import ThemeContext from '../footer';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.context);
    return <div className={style.headerWrap}>header</div>;
  }
}
Header.contextType = ThemeContext;
export default Header;
