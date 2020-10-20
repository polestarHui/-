import React from 'react';
import style from './style.less';
import { Select, Radio, Upload, message, Button, Collapse } from 'antd';
import { UploadOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import $ from 'jquery';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import echarts from 'echarts/lib/echarts';
import 'echarts-gl';
import { PlusCircleOutlined } from '@ant-design/icons';
import { history } from 'umi';
import modelImg from '../../../../asset/home/model.png';
import pouImg from '../../../../asset/home/pou.png';
import planeImg from '../../../../asset/home/planeImg.png';
let map,
  markerWrap = [],
  borderArr = [];
const { Option } = Select;
const { Panel } = Collapse;
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      // $('.ant-upload-list-text').css('display', 'none');
      // $('#fileName').text(`文件名称：${info.file.name}`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败，请重试`);
    }
  },
};

const columns = [
  {
    title: '属性',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '数值',
    dataIndex: 'age',
    width: 150,
  },
];

const text3 = `<div>用户手册</div><div>基本原理</div>`;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      way: '方式',
      isshow: false,
      idearWay: true,
      modelMethod: '',
      showModelImg: false,
    };
  }
  state = {
    value: 0,
  };

  // 按钮选择事件
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
    if (e.target.value == 1) {
      // 表示选择区域
      var path = [
        [119.652174, 40.066636],
        [119.652174, 40.055206],
        [119.622648, 40.055206],
        [119.622648, 40.066636],
      ];
      var polygon = new AMap.Polygon({
        path: path,
        strokeColor: '#FF33FF',
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: '#1791fc',
        zIndex: 50,
      });
      map.add(polygon);
      // 缩放地图到合适的视野级别
      map.setFitView([polygon]);
    } else if (e.target.value == 2) {
    } else if (e.target.value == 3) {
    } else if (e.target.value == 4) {
    }
  };

  // select选择事件
  handleChange = e => {
    // console.log('radio checked123', e);

    if (e.indexOf('建模') != -1) {
      this.setState({
        way: e.substring(0, 2),
      });
      if (e == '钻孔建模') {
        this.setState({
          modelMethod: '钻孔',
        });
      } else if (e == '平面建模') {
        this.setState({
          modelMethod: '平面',
        });
      } else if (e == '剖面建模') {
        this.setState({
          modelMethod: '剖面',
        });
      }
    }
    if (e == '常规热储法') {
      this.setState({
        idearWay: false,
      });
      $('#report').css('display', 'none');
    } else {
      this.setState({
        idearWay: true,
      });
      $('#report').css('display', 'none');
    }
  };

  // 输入xyz之后建立的模型
  goDraw(idearWay, e) {
    $('#mapbox').css('display', 'none');
    $('#report').css('display', 'none');
    $('#modelImg').css('display', 'none');
    $('#planeImg').css('display', 'none');
    $('#pouImg').css('display', 'none');
    if (idearWay) {
      $('#formBox').css('display', 'none');
      $('#diagram').css({
        display: 'block',
        width: 700,
        height: 500,
        margin: 'auto',
      });
      $('#echartsTitle').css('display', 'block');
      var myChart = echarts.init(document.getElementById('diagram'));
      var data = [];
      var noise = new SimplexNoise(Math.random);
      for (var i = 0; i <= 10; i++) {
        for (var j = 0; j <= 10; j++) {
          var value = noise.noise2D(i / 5, j / 5);
          data.push([i, j, value * 2 + 10]);
        }
      }
      var series = [];
      // 控制层数
      for (var i = 0; i < 10; i++) {
        series.push({
          type: 'bar3D',
          data: data,
          stack: 'stack',
          shading: 'lambert',
          emphasis: {
            label: {
              show: true,
            },
          },
        });
      }
      myChart.setOption({
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            restore: {},
            saveAsImage: {},
          },
        },

        xAxis3D: {
          minInterval: 18,
          type: 'value',
        },
        yAxis3D: {
          minInterval: 18,
          type: 'value',
        },
        zAxis3D: {
          minInterval: 18,
          type: 'value',
        },
        grid3D: {
          viewControl: {
            autoRotate: 42,
          },
          light: {
            main: {
              shadow: true,
              quality: 'ultra',
              intensity: 1.5,
            },
          },
        },
        series: series,
      });
    } else {
      $('#diagram').css({
        display: 'none',
        width: 700,
        height: 500,
        margin: 'auto',
      });
      $('#echartsTitle').css('display', 'none');
      $('#formBox').css('display', 'block');
    }
  }

  // 生成报告
  goReport(idearWay, e) {
    $('#diagram').css('display', 'none');
    $('#echartsTitle').css('display', 'none');
    $('#mapbox').css('display', 'none');
    $('#report').css('display', 'flex');
    $('#formBox').css('display', 'none');
    if (idearWay) {
      var myChart = echarts.init(document.getElementById('reportDiagram'));
      var data = [];
      var noise = new SimplexNoise(Math.random);
      for (var i = 0; i <= 10; i++) {
        for (var j = 0; j <= 10; j++) {
          var value = noise.noise2D(i / 5, j / 5);
          data.push([i, j, value * 2 + 4]);
        }
      }
      var series = [];
      // 控制层数
      for (var i = 0; i < 10; i++) {
        series.push({
          type: 'bar3D',
          data: data,
          stack: 'stack',
          shading: 'lambert',
          emphasis: {
            label: {
              show: true,
            },
          },
        });
      }
      myChart.setOption({
        //   title: {
        //     show:true,
        //     text: '图',
        // },
        xAxis3D: {
          minInterval: 18,
          type: 'value',
        },
        yAxis3D: {
          minInterval: 18,
          type: 'value',
        },
        zAxis3D: {
          minInterval: 18,
          type: 'value',
        },
        grid3D: {
          viewControl: {
            // autoRotate: true
          },
          // light: {
          //     main: {
          //         shadow: true,
          //         quality: 'ultra',
          //         intensity: 1.5
          //     }
          // }
        },
        series: series,
      });
    } else {
      $('#formBox2').css('display', 'block');
    }
  }

  // 导出报告--pdf文件本地下载
  exportReport = () => {
    $('#printMsg').css({
      'overflow-y': 'visible',
      'margin-top': '20px',
      border: 'none',
    });
    html2canvas(document.getElementById('showOverflow'), {
      backgroundColor: '#fff',
      allowTaint: true,
      scale: 2, // 提升画面质量，但是会增加文件大小
      height: document.getElementById('showOverflow').scrollHeight, //
      width: document.getElementById('showOverflow').scrollWidth, //为了使横向滚动条的内容全部展示，这里必须指定
    }).then(canvas => {
      $('#printMsg').css({
        'overflow-y': 'auto',
        'margin-top': '0px',
        border: '1px solid',
      });
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = (contentWidth / 595.28) * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //pdf页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = (595.28 / contentWidth) * contentHeight;

      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      var pdf = new jsPDF('', 'pt', 'a4');
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save('导出模板.pdf');
    });
  };

  // 初始化地图
  initMap = () => {
    this.setState({
      value: 0,
    });
    $('#diagram').css('display', 'none');
    $('#echartsTitle').css('display', 'none');
    $('#mapbox').css('display', 'block');
    $('#report').css('display', 'none');
    $('#modelImg').css('display', 'none');

    let _this = this;
    let { mapDom } = this;
    map = new AMap.Map(mapDom, {
      mapStyle: 'amap://styles/darkblue', //高级配色
      resizeEnable: true,
      viewMode: '3D',
      crs: 'EPSG3857',
      isHotspot: false,
      expandZoomRange: true,
      center: [114.446972, 38.017256],
      zIndex: 0,
      pitch: 0,
      features: ['bg', 'road', 'building', 'point'],
      zoom: 10,
      viewMode: '3D',
    });
    map.plugin(['AMap.MouseTool'], function() {
      _this.mouseTool = new AMap.MouseTool(map);
    });
    AMap.plugin(['AMap.ControlBar'], function() {});
    // 添加 3D 罗盘控制
    // map.addControl(new AMap.ControlBar());
    this.map = map;
  };

  // 添加分区
  addArea = () => {
    $('#areaBox')
      .append(`<div style="box-shadow:1px 1px 2px 1px #eee;border-radius:5px;margin-bottom:10px;padding:10px 5px">
<div style="display:flex">
 <div>分区名称：</div>
 <input style="border:1px solid #eee"></input>
</div>
<div style="display:flex">
 <div>分区范围：</div>
 <input style="border:1px solid #eee"></input>
</div>
<div style="display:flex">
 <div>空隙度：&nbsp;&nbsp;&nbsp;</div>
 <input style="border:1px solid #eee"></input>
</div>
<div style="display:flex">
 <div>热储温度：</div>
 <input style="border:1px solid #eee"></input>
</div>
</div>`);
  };

  // 地图校准
  mapCorect = () => {
    console.log(map.getZoom());
    map.setZoom('12');
    // map.setCenter([119.591814, 39.965734]);
  };

  // 添加钻孔、剖面、平面
  addHoles(way, e) {
    this.setState({
      isshow: !this.state.isshow,
    });
    if (way == '平面') {
    } else if (way == '钻孔') {
    } else if (way == '剖面') {
    }
  }

  // 参数校准
  numCorect() {
    history.push('/corectNum');
  }

  // 地图上的打点划线
  mapopration = () => {
    console.log('打点划线', this.state.modelMethod);
    $('#modelImg').css('display', 'none');
    if (this.state.modelMethod == '平面') {
      //   map.addControl(new AMap.MapType({
      //     defaultType:1 //0代表默认，1代表卫星
      // }));
      // 表示网格剖分的平面形式
      $('#pouImg').css('display', 'none');
      $('#mapbox').css('display', 'none');
      $('#diagram').css('display', 'none');
      $('#echartsTitle').css('display', 'none');
      $('#planeImg').css('display', 'block');
      if (markerWrap) {
        map.remove(markerWrap);
      }
      // var path = [
      //   [
      //     [119.632648, 40.066636],
      //     [119.632648, 40.055206],
      //   ],
      //   [
      //     [119.622648, 40.0611],
      //     [119.652174, 40.0611],
      //   ],
      // ];
      // for (var i = 0; i < path.length; i++) {
      //   let polylineBorder = new AMap.Polyline({
      //     path: path[i],
      //     isOutline: true,
      //     outlineColor: '#ffeeff',
      //     borderWeight: 1,
      //     strokeColor: '#3366FF',
      //     strokeOpacity: 1,
      //     strokeWeight: 2,
      //     // 折线样式还支持 'dashed'
      //     strokeStyle: 'solid',
      //     // strokeStyle是dashed时有效
      //     strokeDasharray: [10, 5],
      //     lineJoin: 'round',
      //     lineCap: 'round',
      //     zIndex: 50,
      //   });
      //   polylineBorder.setMap(map);
      //   borderArr.push(polylineBorder);
      // }
    } else if (this.state.modelMethod == '剖面') {
      // 表示网格剖分的剖面形式
      $('#mapbox').css('display', 'none');
      $('#diagram').css('display', 'none');
      $('#echartsTitle').css('display', 'none');
      $('#pouImg').css('display', 'block');
      $('#planeImg').css('display', 'none');
    } else if (this.state.modelMethod == '钻孔') {
      map.addControl(
        new AMap.MapType({
          defaultType: 1, //0代表默认，1代表卫星
        }),
      );
      // 表示网格剖分的钻孔形式
      $('#pouImg').css('display', 'none');
      $('#mapbox').css('display', 'block');
      $('#diagram').css('display', 'none');
      $('#echartsTitle').css('display', 'none');
      $('#planeImg').css('display', 'none');
      if (borderArr) {
        map.remove(borderArr);
      }
      let markers = [
        // [119.622648, 40.066636],
        // [119.632618, 40.065636],
        // [119.642508, 40.063636],
        // [119.64928, 40.066636],
        [119.644498, 40.066636],
      ];
      for (var i = 0; i < markers.length; i++) {
        var marker = new AMap.Marker({
          icon:
            '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          position: markers[i],
          offset: new AMap.Pixel(-13, -30),
        });
        marker.setMap(map);
        markerWrap.push(marker);
      }
    } else {
      console.log('打点划线的elese');
    }
  };

  // 导入建模
  importModel = () => {
    this.setState({ showModelImg: true });
    $('#mapbox').css('display', 'none');
    $('#modelImg').css('display', 'block');
    $('#report').css('display', 'none');
    $('#planeImg').css('display', 'none');
    $('#diagram').css('display', 'none');
    $('#formBox').css('display', 'none');
    $('#pouImg').css('display', 'none');

    $('#echartsTitle').css('display', 'none');
  };

  render() {
    return (
      <div className={style.contentWrap}>
        <div className={style.leftPart}>
          {/* 初步建模 */}
          {this.state.showModelImg ? (
            <div id="modelImg">
              <div
                style={{
                  width: 'max-content',
                  margin: 'auto',
                  fontSize: '16px',
                  fontWeight: ' 600',
                  marginTop: '6%',
                  marginLeft: '10%',
                }}
              >
                <div>项目名称：项目一</div>
                <div>创建人：李教授</div>
                <div>创建时间：2020.09.16</div>
                <div>模型计算方法：三维热储法</div>
              </div>
              <img
                style={{ width: '65%', marginLeft: '17.5%', marginTop: ' 4%' }}
                src={modelImg}
              ></img>
            </div>
          ) : (
            ''
          )}

          {/* 平面建模 */}
          <div id="planeImg" style={{ display: 'none' }}>
            <div
              style={{
                width: 'max-content',
                margin: 'auto',
                fontSize: '16px',
                fontWeight: ' 600',
                marginTop: '6%',
                marginLeft: '10%',
              }}
            >
              <div>项目名称：项目一</div>
              <div>创建人：李教授</div>
              <div>创建时间：2020.09.16</div>
              <div>模型计算方法：三维热储法</div>
              <div>建模方法：平面建模</div>
              <div>经纬度：（114.446972, 38.017256）</div>
              <div>高度：20</div>
            </div>
            <img
              className={style.pouImg}
              src={planeImg}
              style={{ marginTop: '-8%' }}
            ></img>
          </div>

          {/* 剖面建模 */}
          <div id="pouImg" style={{ display: 'none' }}>
            <div
              style={{
                width: 'max-content',
                margin: 'auto',
                fontSize: '16px',
                fontWeight: ' 600',
                marginTop: '6%',
                marginLeft: '10%',
              }}
            >
              <div>项目名称：项目一</div>
              <div>创建人：李教授</div>
              <div>创建时间：2020.09.16</div>
              <div>模型计算方法：三维热储法</div>
              <div>建模方法：平面建模</div>
              <div>经纬度：（114.446972, 38.017256）</div>
              <div>高度：20</div>
            </div>
            <img
              className={style.pouImg}
              style={{ height: '300px' }}
              src={pouImg}
            ></img>
          </div>

          {/* 地图部分 */}
          <div
            id="mapbox"
            className={style.innerMap}
            ref={e => (this.mapDom = e)}
          />
          {/* 绘成曲线 */}
          <div id="echartsTitle" style={{ display: 'none' }}>
            <div
              style={{
                width: 'max-content',
                margin: 'auto',
                fontSize: '16px',
                fontWeight: ' 600',
                marginTop: '6%',
                marginLeft: '10%',
              }}
            >
              <div>项目名称：项目一</div>
              <div>创建人：李教授</div>
              <div>创建时间：2020.09.16</div>
              <div>模型计算方法：三维热储法</div>
              <div>建模方法：平面建模</div>
              <div>XYZ：（114.446972,38.017256,20）</div>
            </div>
            <div id="diagram" ref={e => (this.dom = e)}></div>
          </div>

          <div id="formBox" className={style.formWrap}>
            <div className={style.itemBox}>
              <div className={style.needBorder}>变量名</div>
              <div>数值</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>A计算区面积(㎡):</div>
              <div>2000</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>d热储厚度(m):</div>
              <div>144</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>ρr热储岩石密度(kg/m³):</div>
              <div>52</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>Cr热储岩石比热(J/kg):</div>
              <div>346</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>α热储岩石的空隙度:</div>
              <div>341</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>tr热储温度(℃):</div>
              <div>753</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>to当地年平均气温(℃):</div>
              <div>20</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>ρw地热水密度(kg/m³):</div>
              <div>54</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>S导水系数:</div>
              <div>78</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>H计算起始点以上的高度(m):</div>
              <div>25</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>Cw水的比热(J/kg):</div>
              <div>89</div>
            </div>
            <div className={style.itemBox}>
              <div className={style.needBorder}>结果数值:</div>
              <div>30</div>
            </div>
          </div>

          {/* 生成报告 */}
          <div id="report" className={style.report}>
            <div className={style.reportBtn} onClick={this.exportReport}>
              保存报告
            </div>
            <div className={style.paperBox} id="showOverflow">
              <div className={style.reportBox} id="printMsg">
                <div className={style.topPart}>
                  <div className={style.reportTitle}>
                    隆起山地型资源计算报告
                  </div>
                  <div className={style.itwmWrap}>
                    <div className={style.content}>
                      {this.state.idearWay ? (
                        <div className={style.leftPart}>
                          <div className={style.eveyItem}>
                            <div className={style.title}>计算方法：</div>
                            <div className={style.titleContent}>三维热储法</div>
                          </div>
                          <div className={style.eveyItem}>
                            <div className={style.title}>建模方式：</div>
                            <div className={style.titleContent}>平面建模</div>
                          </div>
                          <div
                            style={{ borderBottom: '0' }}
                            className={style.eveyItem}
                          >
                            <div className={style.title}>网格剖分：</div>
                            <div className={style.titleContent}>平面形式</div>
                          </div>
                        </div>
                      ) : (
                        <div className={style.leftPart}>
                          <div className={style.eveyItem}>
                            <div className={style.title}>项目名称：</div>
                            <div className={style.titleContent}>项目一</div>
                          </div>
                          <div className={style.eveyItem}>
                            <div className={style.title}>计算方法：</div>
                            <div className={style.titleContent}>常规热储法</div>
                          </div>
                          {/* <div style={{borderBottom:'0'}} className={style.eveyItem}>
                    <div className={style.title}>网格剖分：</div>
                    <div className={style.titleContent}>平面形式</div>
                  </div> */}
                        </div>
                      )}
                    </div>
                    <div className={style.logoWrap}>logo位置部分</div>
                  </div>
                </div>
                <div className={style.midlePart}>
                  {this.state.idearWay ? (
                    <div
                      id="reportDiagram"
                      style={{ width: 500, height: 400, margin: 'auto' }}
                    ></div>
                  ) : (
                    <div id="formBox2" className={style.formWrap}>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>变量名</div>
                        <div>数值</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>A计算区面积(㎡):</div>
                        <div>2000</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>d热储厚度(m):</div>
                        <div>93</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>
                          ρr热储岩石密度(kg/m³):
                        </div>
                        <div>26</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>
                          Cr热储岩石比热(J/kg):
                        </div>
                        <div>85</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>
                          α热储岩石的空隙度:
                        </div>
                        <div>90</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>tr热储温度(℃):</div>
                        <div>37</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>
                          to当地年平均气温(℃):
                        </div>
                        <div>22</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>
                          ρw地热水密度(kg/m³):
                        </div>
                        <div>76</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>S导水系数:</div>
                        <div>89</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>
                          H计算起始点以上的高度(m):
                        </div>
                        <div>35</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>
                          Cw水的比热(J/kg):
                        </div>
                        <div>62</div>
                      </div>
                      <div className={style.itemBox}>
                        <div className={style.needBorder}>结果数值:</div>
                        <div>90</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={style.bottomPart}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.rightPart}>
          <div className={style.title}>
            <li className={style.titleText}>隆起山地型资源计算方法</li>
            {/* <Select
              defaultValue="操作选项"
              style={{ width: '100' }}
              onChange={this.handleChange}
            >
              <Option value="从本地打开">
                <Upload {...props}>
                  <Button
                    style={{
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      padding: '0',
                    }}
                  >
                    从本地打开
                  </Button>
                </Upload>
              </Option>
              <Option value="从服务端打开">从服务端打开</Option>
              <Option value="保存到本地">保存到本地</Option>
              <Option value="保存到服务器">保存到服务器</Option>
              <Option value="模板下载">
                <a
                  href="模板下载"
                  style={{ color: '#262626' }}
                  download="../data_template/demo1.xlsx"
                >
                  模板下载
                </a>
              </Option>
            </Select> */}
          </div>
          {/* <div className={style.fileName} id="fileName">
            文件名称：未选择任何文件
          </div> */}
          <div className={style.itemWrap}>
            <div>项目名称：</div>
            <input type="text" placeholder="请输入项目名称" />
          </div>
          <div
            className={style.itemWrap}
            style={{ borderBottom: '1px solid', paddingBottom: '5px' }}
          >
            <div>计算方法：</div>
            <Select
              defaultValue="三维热储法"
              style={{ width: 200 }}
              onChange={this.handleChange}
            >
              <Option value="三维热储法">三维热储法</Option>
              <Option value="常规热储法">常规热储法</Option>
              <Option value="解析法">解析法</Option>
              <Option value="补给量法">补给量法</Option>
              <Option value="数值法">数值法</Option>
            </Select>
          </div>
          <div className={style.itemWrap}>
            <Collapse
              accordion
              bordered={false}
              style={{ width: '100%' }}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              {this.state.idearWay ? (
                <Panel header="三维建模" key="12">
                  <Collapse accordion>
                    <Panel header="导入模型" key="1">
                      <div style={{ marginBottom: '10px' }}>
                        <Upload {...props}>
                          <Button icon={<UploadOutlined />}>上传文件</Button>
                        </Upload>
                      </div>
                      <div
                        onClick={this.importModel}
                        style={{
                          background: '#F5AF33',
                          color: '#fff',
                          width: 'max-content',
                          padding: ' 0 10px',
                          borderRadius: '5px',
                          // margin: 'auto',
                          cursor: 'pointer',
                        }}
                      >
                        导入模型
                      </div>
                    </Panel>
                    <Panel header="建立模型" key="2">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                        }}
                      >
                        <div>导入地图：</div>
                        <div
                          style={{
                            width: 'max-content',
                            background: '#F5AF33',
                            color: '#fff',
                            padding: ' 0 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                          onClick={this.initMap}
                        >
                          导入
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                        }}
                      >
                        <div>地图校准：</div>
                        <div
                          style={{
                            width: 'max-content',
                            background: '#F5AF33',
                            color: '#fff',
                            padding: ' 0 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                          onClick={this.mapCorect}
                        >
                          校准
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                        }}
                      >
                        <div>区域选择：</div>
                        <Radio.Group
                          onChange={this.onChange}
                          value={this.state.value}
                        >
                          <Radio value={1}>区域一</Radio>
                        </Radio.Group>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div>建模方法：</div>
                        <Select
                          defaultValue="请选择"
                          style={{ width: 107 }}
                          onChange={this.handleChange}
                        >
                          <Option value="钻孔建模">钻孔建模</Option>
                          <Option value="平面建模">平面建模</Option>
                          <Option value="剖面建模">剖面建模</Option>
                        </Select>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                        }}
                      >
                        <div>添加{this.state.way}：</div>
                        <div
                          style={{
                            width: 'max-content',
                            background: '#F5AF33',
                            color: '#fff',
                            padding: ' 0 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                          onClick={this.addHoles.bind(this, this.state.way)}
                        >
                          添加
                        </div>
                      </div>
                      {this.state.isshow ? (
                        <div
                          style={{
                            boxShadow: '1px 1px 3px 1px #eee',
                            borderRadius: '5px',
                            padding: '5px 10px',
                          }}
                        >
                          <div style={{ display: 'flex', marginBottom: 5 }}>
                            <div>经度：</div>
                            <input style={{ border: '1px solid #eee' }}></input>
                          </div>
                          <div style={{ display: 'flex', marginBottom: 5 }}>
                            <div>纬度：</div>
                            <input style={{ border: '1px solid #eee' }}></input>
                          </div>
                          <div style={{ display: 'flex', marginBottom: 5 }}>
                            <div>高度：</div>
                            <input style={{ border: '1px solid #eee' }}></input>
                          </div>
                          <div
                            onClick={this.mapopration}
                            style={{
                              width: 'max-content',
                              background: '#F5AF33',
                              color: '#fff',
                              padding: '0 30px',
                              margin: 'auto',
                              borderRadius: '5px',
                              cursor: 'pointer',
                            }}
                          >
                            确定
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      <div
                        onClick={() => {
                          this.setState({ showModelImg: true });
                          $('#mapbox').css('display', 'none');
                          $('#modelImg').css('display', 'block');
                          $('#report').css('display', 'none');
                          $('#planeImg').css('display', 'none');
                          $('#pouImg').css('display', 'none');
                        }}
                        style={{
                          width: 'max-content',
                          background: '#F5AF33',
                          padding: '0px 30px',
                          borderRadius: '5px',
                          margin: 'auto',
                          marginTop: '15px',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        建模
                      </div>
                    </Panel>
                  </Collapse>
                </Panel>
              ) : (
                ''
              )}
              {this.state.idearWay ? (
                <Panel
                  header="网格剖分"
                  key="13"
                  className="site-collapse-custom-panel"
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', width: '33%' }}>
                      <div>X：</div>
                      <input
                        style={{ border: '1px solid #eee', width: '75%' }}
                      ></input>
                    </div>
                    <div style={{ display: 'flex', width: '33%' }}>
                      <div>Y：</div>
                      <input
                        style={{ border: '1px solid #eee', width: '75%' }}
                      ></input>
                    </div>
                    <div style={{ display: 'flex', width: '33%' }}>
                      <div>Z：</div>
                      <input
                        style={{ border: '1px solid #eee', width: '75%' }}
                      ></input>
                    </div>
                  </div>
                  <div
                    style={{
                      background: '#F5AF33',
                      width: 'max-content',
                      color: '#fff',
                      padding: ' 0px 30px',
                      margin: 'auto',
                      borderRadius: '5px',
                      marginTop: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={this.goDraw.bind(this, this.state.idearWay)}
                  >
                    确定
                  </div>
                </Panel>
              ) : (
                ''
              )}
              <Panel
                header="参数设置"
                key="1"
                className="site-collapse-custom-panel"
              >
                {this.state.idearWay ? (
                  <div>
                    <Collapse accordion>
                      <Panel header="定值参数" key="1">
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>A计算区面积(㎡):</div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>d热储厚度(m):</div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>
                            ρr热储岩石密度(kg/m³):
                          </div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>
                            Cr热储岩石比热(J/kg):
                          </div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>
                            α热储岩石的空隙度:
                          </div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>tr热储温度(℃):</div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>
                            to当地年平均气温(℃):
                          </div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>
                            ρw地热水密度(kg/m³):
                          </div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>S导水系数:</div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>
                            H计算起始点以上的高度(m):
                          </div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                        <div
                          className={style.collapseContent}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '112%' }}>Cw水的比热(J/kg):</div>
                          <input
                            type="text"
                            style={{
                              width: '50%',
                              border: '1px solid #cac9c9',
                            }}
                          />
                        </div>
                      </Panel>

                      <Panel header="变量参数" key="2">
                        <div
                          onClick={this.addArea}
                          style={{ cursor: 'pointer' }}
                        >
                          添加分区&nbsp;&nbsp;
                          <PlusCircleOutlined />
                        </div>
                        <div id="areaBox">
                          <div
                            style={{
                              boxShadow: '1px 1px 2px 1px #eee',
                              borderRadius: '5px',
                              marginBottom: '5px',
                              padding: '10px 5px',
                            }}
                          >
                            <div style={{ display: 'flex' }}>
                              <div>分区名称：</div>
                              <input
                                style={{ border: '1px solid #eee' }}
                              ></input>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <div>分区范围：</div>
                              <input
                                style={{ border: '1px solid #eee' }}
                              ></input>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <div>空隙度：&nbsp;&nbsp;&nbsp;</div>
                              <input
                                style={{ border: '1px solid #eee' }}
                              ></input>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <div>热储温度：</div>
                              <input
                                style={{ border: '1px solid #eee' }}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </Panel>
                      <Panel header="插值计算" key="3">
                        <div
                          style={{
                            width: 'max-content',
                            background: '#F5AF33',
                            padding: '0 10px',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            margin: 'auto',
                            color: '#fff',
                          }}
                        >
                          插值计算
                        </div>
                      </Panel>
                      <Panel header="参数导入" key="4">
                        <div
                          style={{
                            width: 'max-content',
                            background: '#F5AF33',
                            padding: '0 10px',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            margin: 'auto',
                            color: '#fff',
                          }}
                        >
                          参数导入
                        </div>
                      </Panel>
                      <Panel header="参数校准" key="5">
                        <div
                          style={{
                            width: 'max-content',
                            background: '#F5AF33',
                            padding: '0 10px',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            margin: 'auto',
                            color: '#fff',
                          }}
                          onClick={this.numCorect}
                        >
                          参数校准
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                ) : (
                  <Collapse>
                    <Panel header="定值参数" key="1">
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>A计算区面积(㎡):</div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '10px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>d热储厚度(m):</div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>
                          ρr热储岩石密度(kg/m³):
                        </div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>
                          Cr热储岩石比热(J/kg):
                        </div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>α热储岩石的空隙度:</div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>tr热储温度(℃):</div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>
                          to当地年平均气温(℃):
                        </div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>
                          ρw地热水密度(kg/m³):
                        </div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>S导水系数:</div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>
                          H计算起始点以上的高度(m):
                        </div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                      <div
                        className={style.collapseContent}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          width: '100%',
                        }}
                      >
                        <div style={{ width: '112%' }}>Cw水的比热(J/kg):</div>
                        <input
                          type="text"
                          style={{ width: '50%', border: '1px solid #cac9c9' }}
                        />
                      </div>
                    </Panel>
                  </Collapse>
                )}
              </Panel>
              <Panel
                header="数据分析"
                key="2"
                className="site-collapse-custom-panel"
              >
                <div
                  style={{
                    display: 'flex',
                    width: '54%',
                    justifyContent: 'space-between',
                    margin: 'auto',
                  }}
                >
                  <div
                    style={{
                      border: '1px solid #F5AF33',
                      padding: ' 0 10px',
                      borderRadius: '4px',
                      background: 'rgb(245, 175, 51)',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={this.goDraw.bind(this, this.state.idearWay)}
                  >
                    计算结果
                  </div>
                  <div
                    style={{
                      border: '1px solid #F5AF33',
                      padding: ' 0 10px',
                      borderRadius: '4px',
                      background: 'rgb(245, 175, 51)',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={this.goReport.bind(this, this.state.idearWay)}
                  >
                    生成报告
                  </div>
                  {/* <Table columns={columns} dataSource={data} pagination={{ pageSize: 50, position: ["bottomCenter"] }} scroll={{ y: 180 }} /> */}
                </div>
              </Panel>
              <Panel
                header="使用帮助"
                key="3"
                className="site-collapse-custom-panel"
              >
                <div style={{ cursor: 'pointer' }} id="helpWrap">
                  <div dangerouslySetInnerHTML={{ __html: text3 }} />
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}
