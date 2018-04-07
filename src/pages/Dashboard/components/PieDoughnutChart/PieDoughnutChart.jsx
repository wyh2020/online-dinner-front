import React, { Component } from 'react';
import { Grid, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Chart, Coord, Geom, Tooltip, Axis, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import CommonInfo from '../../../../util/CommonInfo';
import CallApi from '../../../../util/Api';

const { Row, Col } = Grid;
const { DataView } = DataSet;

export default class PieDoughnutChart extends Component {
  static displayName = 'PieDoughnutChart';

  constructor(props) {
    super(props);
    this.state = {
      goodMap: [],
      userMap: [],
      userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
    };
  }

  componentDidMount = () => {
    const userInfo = this.state.userInfo;
    if (userInfo.type === 1) {
      CallApi('/od/count/countUserAndGood', null, 'GET', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          const userMap = [];
          if (res.userMap) {
            userMap.push({ genre: '男', sold: res.userMap[1] || 0 });
            userMap.push({ genre: '女', sold: res.userMap[2] || 0 });
            userMap.push({ genre: '未知', sold: res.userMap[3] || 0 });
          }
          const goodMap = [];
          // 1 鲁菜、2 川菜、3 粤菜、4 闽菜、5 苏菜、6 浙菜、7 湘菜、8 徽菜
          if (res.goodMap) {
            goodMap.push({ genre: '鲁菜', sold: res.goodMap[1] || 0 });
            goodMap.push({ genre: '川菜', sold: res.goodMap[2] || 0 });
            goodMap.push({ genre: '粤菜', sold: res.goodMap[3] || 0 });
            goodMap.push({ genre: '闽菜', sold: res.goodMap[4] || 0 });
            goodMap.push({ genre: '苏菜', sold: res.goodMap[5] || 0 });
            goodMap.push({ genre: '浙菜', sold: res.goodMap[6] || 0 });
            goodMap.push({ genre: '湘菜', sold: res.goodMap[7] || 0 });
            goodMap.push({ genre: '徽菜', sold: res.goodMap[8] || 0 });
          }
          this.setState({
            userMap,
            goodMap,
          });
          console.log('res===', res);
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    }
  }

  render() {
    const { goodMap, userMap } = this.state;
    console.log('goodMap=======', goodMap);
    console.log('userMap=======', userMap);
    const dv = new DataView();
    const dv2 = new DataView();
    dv.source(userMap).transform({
      type: 'percent',
      field: 'sold',
      dimension: 'genre',
      as: 'percent',
    });

    dv2.source(goodMap).transform({
      type: 'percent',
      field: 'sold',
      dimension: 'genre',
      as: 'percent',
    });

    const cols = {
      percent: {
        formatter: (val) => {
          val = `${(val * 100).toFixed(2)}%`;
          return val;
        },
      },
    };

    return (
      <div className="pie-doughnut-chart">
        <Row wrap gutter="20">
          <Col xxs="24" s="24" l="12">
            <IceContainer title="用户性别占比" style={styles.leftContainer}>
              <Chart
                width={450}
                height={300}
                data={dv}
                scale={cols}
                padding={[0, 10, 30, 10]}
                forceFit
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend position="bottom" offsetY={-60} />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom type="intervalStack" position="percent" color="genre" />
              </Chart>
            </IceContainer>
          </Col>
          <Col xxs="24" s="24" l="12">
            <IceContainer title="菜系分布" style={styles.rightContainer}>
              <Chart
                style={styles.chart}
                width={450}
                height={300}
                data={dv2}
                scale={cols}
                padding={[0, 10, 30, 10]}
                forceFit
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend position="bottom" offsetY={-60} />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom type="intervalStack" position="percent" color="genre" />
              </Chart>
            </IceContainer>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {};
