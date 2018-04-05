

import React, { Component } from 'react';

import InfoDisplayTab from './components/InfoDisplayTab';

import './GoodSelect.scss';

export default class GoodSelect extends Component {
  static displayName = 'GoodSelect';

  constructor(props) {
    super(props);
    this.state = {
      shopInfo: this.props.location.state || {},
    };
    const data = this.props.location.state;
    console.log('data===1111111111111111====', data);
  }

  render() {
    const shopInfo = this.state.shopInfo;
    return (
      <div className="card-list-page">
        <InfoDisplayTab shopInfo={shopInfo} />
      </div>
    );
  }
}
