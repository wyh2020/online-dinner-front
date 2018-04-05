

import React, { Component } from 'react';

import InfoDisplayTab from './components/InfoDisplayTab';

import './ShopsList.scss';

export default class ShopsList extends Component {
  static displayName = 'ShopsList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card-list-page">
        <InfoDisplayTab />
      </div>
    );
  }
}
