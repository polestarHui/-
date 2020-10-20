import React from 'react';
import style from './style.less';
import bg from '../../../asset/home/testBg.png';
import { Link } from 'umi';
import { Collapse } from 'antd';
import wcsb from '../../../asset/home/1.1.png';
import uplift from '../../../asset/home/1.2.png';
import well from '../../../asset/home/1.3.png';
import help from '../../../asset/home/help.png';
import system from '../../../asset/home/system.png';

const { Panel } = Collapse;

// const text = (<p style={{ paddingLeft: 24 }}>
//   A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
//   as a welcome guest in many households across the world.
// </p>)

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.homeWrap}>
        {/* 折叠面板 */}
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="地热资源计算与评价" key="1">
            <div
              className={style.itemWrap}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '20px',
                paddingBottom: '10px',
              }}
            >
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/wellNum">
                  <img
                    style={{
                      width: ' 100%',
                      boxShadow: '1px 2px 4px #b0acac',
                    }}
                    src={uplift}
                    title="隆起山地型"
                    alt="隆起山地型"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>隆起山地型</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/modelBuild">
                  <img
                    style={{
                      width: ' 100%',
                      boxShadow: '1px 2px 4px #b0acac',
                    }}
                    src={wcsb}
                    title="沉积盆地型"
                    alt="沉积盆地型"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>沉积盆地型</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/modelBuild">
                  <img
                    style={{
                      width: ' 100%',
                      boxShadow: '1px 2px 4px #b0acac',
                    }}
                    src={well}
                    title="单（对）井评价"
                    alt="单（对）井评价"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>单（对）井评价</div>
              </div>
            </div>
          </Panel>
          <Panel header="地热流体质量评价" key="2">
            <div
              className={style.itemWrap}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '20px',
                paddingBottom: '10px',
              }}
            >
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                  marginBottom: '15px',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="理疗热矿水评价"
                  alt="理疗热矿水评价"
                />
                <div style={{ textAlign: 'center' }}>理疗热矿水评价</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="引用天然矿泉水评价"
                  alt="引用天然矿泉水评价"
                />
                <div style={{ textAlign: 'center' }}>引用天然矿泉水评价</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="生活引用水评价"
                  alt="生活引用水评价"
                />
                <div style={{ textAlign: 'center' }}>生活引用水评价</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="农业灌溉用水评价"
                  alt="农业灌溉用水评价"
                />
                <div style={{ textAlign: 'center' }}>农业灌溉用水评价</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="渔业用水平价"
                  alt="渔业用水平价"
                />
                <div style={{ textAlign: 'center' }}>渔业用水平价</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="有用矿物组分评价"
                  alt="有用矿物组分评价"
                />
                <div style={{ textAlign: 'center' }}>有用矿物组分评价</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="地热流体腐蚀性评价"
                  alt="地热流体腐蚀性评价"
                />
                <div style={{ textAlign: 'center' }}>地热流体腐蚀性评价</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="地热流体结垢评价"
                  alt="地热流体结垢评价"
                />
                <div style={{ textAlign: 'center' }}>地热流体结垢评价</div>
              </div>
            </div>
          </Panel>
          <Panel header="地热田地质条件" key="3">
            <div
              className={style.itemWrap}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '20px',
                paddingBottom: '10px',
              }}
            >
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/wellNum">
                  <img
                    style={{
                      width: ' 100%',
                      boxShadow: '1px 2px 4px #b0acac',
                    }}
                    src={bg}
                    title="地球物理与地温场特征"
                    alt="地球物理与地温场特征"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>地球物理与地温场特征</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="热储特征及埋藏条件"
                  alt="热储特征及埋藏条件"
                />
                <div style={{ textAlign: 'center' }}>热储特征及埋藏条件</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="地热流体动态特征"
                  alt="地热流体动态特征"
                />
                <div style={{ textAlign: 'center' }}>地热流体动态特征</div>
              </div>
            </div>
          </Panel>
          <Panel header="地热流体化学特征" key="4">
            <div
              className={style.itemWrap}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '20px',
                paddingBottom: '10px',
              }}
            >
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/wellNum">
                  <img
                    style={{
                      width: ' 100%',
                      boxShadow: '1px 2px 4px #b0acac',
                    }}
                    src={bg}
                    title="水化学特征"
                    alt="水化学特征"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>水化学特征</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="同位素特征"
                  alt="同位素特征"
                />
                <div style={{ textAlign: 'center' }}>同位素特征</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="地下热水补给高程"
                  alt="地下热水补给高程"
                />
                <div style={{ textAlign: 'center' }}>地下热水补给高程</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <img
                  style={{
                    width: ' 100%',
                    boxShadow: '1px 2px 4px #b0acac',
                  }}
                  src={bg}
                  title="地下热水循环深度"
                  alt="地下热水循环深度"
                />
                <div style={{ textAlign: 'center' }}>地下热水循环深度</div>
              </div>
            </div>
          </Panel>
          <Panel header="产能实验" key="5">
            <div
              className={style.itemWrap}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '20px',
                paddingBottom: '10px',
              }}
            >
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/modelBuild">
                  <img
                    style={{
                      width: ' 100%',
                      boxShadow: '1px 2px 4px #b0acac',
                    }}
                    src={bg}
                    title="低温地热井降压试验"
                    alt="低温地热井降压试验"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>低温地热井降压试验</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/modelBuild">
                  <img
                    style={{ width: ' 100%', boxShadow: '1px 2px 4px #b0acac' }}
                    src={bg}
                    title="中、高温地热井放喷试验"
                    alt="中、高温地热井放喷试验"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>
                  中、高温地热井放喷试验
                </div>
              </div>
              <div
                className={style.item}
                style={{ width: '16%', marginRight: '7%' }}
              >
                <img
                  style={{ width: ' 100%', boxShadow: '1px 2px 4px #b0acac' }}
                  src={bg}
                  title="回灌试验"
                  alt="回灌试验"
                />
                <div style={{ textAlign: 'center' }}>回灌试验</div>
              </div>
            </div>
          </Panel>
          <Panel header="系统说明" key="6">
            <div
              className={style.itemWrap}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '20px',
                paddingBottom: '10px',
              }}
            >
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/modelBuild">
                  <img
                    style={{
                      width: ' 100%',
                      boxShadow: '1px 2px 4px #b0acac',
                    }}
                    src={system}
                    title="系统介绍"
                    alt="系统介绍"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>系统介绍</div>
              </div>
              <div
                className={style.item}
                style={{
                  width: '16%',
                  marginRight: '7%',
                }}
              >
                <Link to="/modelCon/modelBuild">
                  <img
                    style={{
                      width: ' 100%',
                      boxShadow: '1px 2px 4px #b0acac',
                    }}
                    src={help}
                    title="使用帮助"
                    alt="使用帮助"
                  />
                </Link>
                <div style={{ textAlign: 'center' }}>使用帮助</div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default Home;
