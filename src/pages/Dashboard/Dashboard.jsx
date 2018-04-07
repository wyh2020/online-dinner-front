

import React, { Component } from 'react';
import { Feedback } from '@icedesign/base/index';

import DisplayCard from './components/DisplayCard';

import PieDoughnutChart from './components/PieDoughnutChart';

import TradeList from '../TradeList';

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
    const userInfo = this.state.userInfo;
    // 普通用户
    if (userInfo.type === 3) {
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
  }

  render() {
    const userInfo = this.state.userInfo;
    // 超级管理员
    if (userInfo.type === 1) {
      return (
        <div className="dashboard-page">
          <DisplayCard />
          <PieDoughnutChart />
        </div>
      );
    }
    // 商户
    if (userInfo.type === 2) {
      return (
        <div className="dashboard-page">
          <TradeList />
        </div>
      );
    }
    // 普通客户
    if (userInfo.type === 3) {
      return (
        <div className="dashboard-page">
          <ShopList />
        </div>
      );
    }
  }
}
