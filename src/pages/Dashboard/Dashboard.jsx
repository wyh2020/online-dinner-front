

import React, { Component } from 'react';
import { Feedback } from '@icedesign/base/index';

import DisplayCard from './components/DisplayCard';

import TabChart from './components/TabChart';

import PieDoughnutChart from './components/PieDoughnutChart';

import ProgressTable from './components/ProgressTable';

import EditableTable from './components/EditableTable';

import ChartBar from './components/ChartBar';

import ShopList from './components/ShopList';

import './Dashboard.scss';
import CommonInfo from '../../util/CommonInfo';
import CallApi from '../../util/Api';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
    };
  }

  componentDidMount = () => {
    CallApi('/od/cart/queryCount', null, 'GET', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        console.log('res===', res);
        CommonInfo.saveODCartSum(res || 0);
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }

  render() {
    const userInfo = this.state.userInfo;
    // 超级管理员
    if (userInfo.type === 11) {
      return (
        <div className="dashboard-page">

          <DisplayCard />

          <TabChart />

          <PieDoughnutChart />

          <ProgressTable />

          <EditableTable />

          <ChartBar />
        </div>
      );
    }
    // 商户
    if (userInfo.type === 21) {
      return (
        <div className="dashboard-page">

          <DisplayCard />

          <TabChart />

          <PieDoughnutChart />

          <ProgressTable />

          <EditableTable />

          <ChartBar />
        </div>
      );
    }
    // 普通客户
    if (userInfo.type === 1) {
      return (
        <div className="dashboard-page">
          <ShopList />
        </div>
      );
    }
  }
}
