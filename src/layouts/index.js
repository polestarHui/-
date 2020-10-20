import React from 'react';
import style from './style.less';
import logo from '../../asset/home/logo.svg';
import { Link } from 'umi';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  HomeOutlined,
  FileOutlined,
  ExportOutlined,
  CalculatorOutlined,
  SafetyCertificateOutlined,
  AreaChartOutlined,
  BgColorsOutlined,
  ExperimentOutlined,
  PictureOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default class extends React.Component {
  constructor(props) {
    super(props);
    document.title = '河北省地矿局第八地质大队云计算平台';
  }
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed, e) => {
    // console.log(collapsed);
    // console.log(e);
    this.setState({ collapsed });
  };

  render() {
    let { location, children } = this.props;
    // console.log('children',children);
    if (location.pathname === '/login') {
      return children;
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsedWidth="80"
          width="230"
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          className="navList"
        >
          <div className="logo">
            <img
              src={logo}
              alt="logo"
              style={{ width: '30px', margin: '18px 0 18px 23px' }}
            />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/home">首页</Link>
            </Menu.Item>
            <Menu.Item key="32" icon={<EnvironmentOutlined />}>
              <Link to="/modelCon/modelBuild">区域地热条件</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<CalculatorOutlined />}
              title="地热资源计算与评价"
            >
              <Menu.Item key="2">
                <Link to="/modelCon/wellNum">隆起山地型</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/modelCon/modelBuild">沉积盆地型</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/modelCon/modelBuild">单（对）井评价</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<SafetyCertificateOutlined />}
              title="地热流体质量评价"
            >
              <Menu.Item key="5">
                <Link to="/modelCon/modelBuild">理疗热矿水评价</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/modelCon/modelBuild">引用天然矿泉水评价</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/modelCon/modelBuild">生活引用水评价</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/modelCon/modelBuild">农业灌溉用水评价</Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to="/modelCon/modelBuild">渔业用水平价</Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to="/modelCon/modelBuild">有用矿物组分评价</Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to="/modelCon/modelBuild">地热流体腐蚀性评价</Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to="/modelCon/modelBuild">地热流体结垢评价</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<AreaChartOutlined />}
              title="地热田地质条件"
            >
              <Menu.Item key="13">
                <Link to="/modelCon/modelBuild">地球物理与地温场特征</Link>
              </Menu.Item>
              <Menu.Item key="14">
                <Link to="/modelCon/modelBuild">热储特征及埋藏条件</Link>
              </Menu.Item>
              <Menu.Item key="15">
                <Link to="/modelCon/modelBuild">地热流体动态特征</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              icon={<BgColorsOutlined />}
              title="地热流体化学特征"
            >
              <Menu.Item key="16">
                <Link to="/modelCon/modelBuild">水化学特征</Link>
              </Menu.Item>
              <Menu.Item key="17">
                <Link to="/modelCon/modelBuild">同位素特征</Link>
              </Menu.Item>
              <Menu.Item key="18">
                <Link to="/modelCon/modelBuild">地下热水补给高程</Link>
              </Menu.Item>
              <Menu.Item key="19">
                <Link to="/modelCon/modelBuild">地下热水循环深度</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<ExperimentOutlined />} title="产能实验">
              <Menu.Item key="20">
                <Link to="/modelCon/modelBuild">低温地热井降压试验</Link>
              </Menu.Item>
              <Menu.Item key="21">
                <Link to="/modelCon/modelBuild">中、高温地热井放喷试验</Link>
              </Menu.Item>
              <Menu.Item key="22">
                <Link to="/modelCon/modelBuild">回灌试验</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<FileOutlined />} title="报告">
              <Menu.Item key="23">
                <Link to="/modelCon/modelBuild">报告查询</Link>
              </Menu.Item>
              <Menu.Item key="24">
                <Link to="/modelCon/modelBuild">报告下载</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" icon={<PictureOutlined />} title="插图图库">
              <Menu.Item key="25">
                <Link to="/modelCon/modelBuild">查询</Link>
              </Menu.Item>
              <Menu.Item key="26">
                <Link to="/modelCon/modelBuild">上传</Link>
              </Menu.Item>
              <Menu.Item key="27">
                <Link to="/modelCon/modelBuild">下载</Link>
              </Menu.Item>
              <Menu.Item key="28">
                <Link to="/modelCon/modelBuild">删除</Link>
              </Menu.Item>
              <Menu.Item key="29">
                <Link to="/modelCon/modelBuild">移动</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub8" icon={<DesktopOutlined />} title="系统说明">
              <Menu.Item key="30">
                <Link to="/modelCon/modelBuild">系统介绍</Link>
              </Menu.Item>
              <Menu.Item key="31">
                <Link to="/modelCon/modelBuild">使用帮助</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="headerContent" style={{ padding: '0 10px' }}>
            <div className="title">河北省地矿局第八地质大队云计算平台</div>
            <div>注册人数:222&nbsp;&nbsp;&nbsp;&nbsp;当前在线人数:5</div>
            <div>
              <Link to="/login">
                您好，游客{' '}
                <ExportOutlined
                  style={{ marginBottom: '-3px', marginRight: '14px' }}
                />
              </Link>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}

            <div
              className="site-layout-background"
              style={{ padding: '24px 24px 0 24px', minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '0 0 5px 0' }}>
            北京水木联合科技有限公司
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
