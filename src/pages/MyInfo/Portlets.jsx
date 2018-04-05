

import React, { Component } from 'react';

import BasicDetailInfo from './components/BasicDetailInfo';

import CollapseCard from './components/CollapseCard';

import CommonInfo from '../../util/CommonInfo';

import './Portlets.scss';

export default class Portlets extends Component {
  static displayName = 'Portlets';

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
    };
  }

  render() {
    const userInfo = this.state.userInfo;
    return (
      <div className="portlets-page">
        <BasicDetailInfo />

        {
          userInfo.type === 2 ? <CollapseCard /> : null
        }

      </div>
    );
  }
}
