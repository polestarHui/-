import React from 'react';
import { history } from 'umi';

export default props => {
  history.push('/login');
  return <div></div>;
};
