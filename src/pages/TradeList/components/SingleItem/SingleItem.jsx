import React, { Component } from 'react';
import Constant from '../../../../util/Constant';

import './SingleItem.scss';

export default class SingleItem extends Component {
  static displayName = 'SingleItem';

  render() {
    const {
      item,
      record,
      index,
    } = this.props;
    console.log('porps====', this.props)
    const sums = record.sums.split(',');
    const sum = sums[index];
    const imgUrl = Constant.goodImgs[item.img || 0];
    return (
      <div
        className="single-item"
        style={styles.orderList}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={imgUrl} style={styles.orderImg} alt="头像" />
        </div>
        <div style={styles.orderName}>
          {name}
        </div>
        <div style={styles.orderName}>
          {`¥${item.price} * ${sum}`}
        </div>
      </div>
    );
  }
}

const styles = {
  orderImg: {
    textAlign: 'center',
    width: '60px',
    height: '60px',
    float: 'left',
    marginRight: '10px',
  },
  orderList: {
    textAlign: 'center',
    height: '100px',
    width: '100px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  orderName: {
    textOverflow: 'ellipsis',
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: '#999',
    lineHeight: '18px',
    fontSize: '12px',
    margin: '0 14px',
  },
};
