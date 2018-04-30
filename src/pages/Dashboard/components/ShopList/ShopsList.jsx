

import React, { Component } from 'react';

import InfoDisplayTab from './components/InfoDisplayTab';

import './ShopsList.scss';
import FilterWithSearch from './components/FilterWithSearch/FilterWithSearch';
import CallApi from '../../../../util/Api';

export default class ShopsList extends Component {
  static displayName = 'ShopsList';

  constructor(props) {
    super(props);
    this.state = {
      shopname: '',
      tabData: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  /**
   * 异步获取数据
   */
  getData = () => {
    const form = {};
    form.shopname = this.state.shopname || '';
    CallApi('/od/shop/queryPageList', form, 'GET', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        console.log('res===', res);
        this.setState({
          tabData: res.dataList || [],
        });
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  };

  onBack = (shopname) => {
    this.setState({
      shopname,
    });
    setTimeout(() => {
      this.getData();
    }, 200);
  }

  render() {
    const tabData = this.state.tabData;

    return (
      <div className="card-list-page">
        <FilterWithSearch onBack={this.onBack} />
        <InfoDisplayTab tabData={tabData} />
      </div>
    );
  }
}
