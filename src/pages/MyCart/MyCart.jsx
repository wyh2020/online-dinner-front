import React, { Component } from 'react';
import { Table, Feedback, Button } from '@icedesign/base';
import IceTitle from '@icedesign/title';
import IceContainer from '@icedesign/container';
import CallApi from '../../util/Api';
import Constant from '../../util/Constant';
import CommonInfo from '../../util/CommonInfo';
import DetailGood from './components/DetailGood';
import DeleteBalloon from './components/DeleteBalloon';

export default class OrderList extends Component {
  static displayName = 'OrderList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      selectedRowKeys: [],
      records: [],
      detailVisible: false,
      good: {},
    };
  }

  componentDidMount() {
    this.getTableData();
  }

  /**
   * 异步获取数据
   */
  getTableData = () => {
    CallApi('/od/cart/queryListForCart', null, 'POST', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        this.setState({
          tableData: res.dataList,
        });
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  };

  /**
   * 渲染菜品信息
   */
  renderGoodInfo = (value, index, record) => {
    const goodInfo = record.goodPo;
    const imgUrl = Constant.goodImgs[goodInfo.img || 0];
    return (
      <div className="order-info" style={styles.orderInfo}>
        <img src={imgUrl} style={styles.orderImg} alt="头像" />
        <div className="order-description" style={styles.orderDescription}>
          {goodInfo.name}
        </div>
      </div>
    );
  };

  /**
   * 渲染订单价格
   */
  renderOrderPrice = (value, index, record) => {
    const goodInfo = record.goodPo;
    return <b>{`¥ ${goodInfo.price}`}</b>;
  };

  /**
   * 渲染商品数量
   */
  renderGoodSum = (value, index, record) => {
    return <b>{`${record.sum}`}</b>;
  };

  /**
   * 渲染店铺名称
   */
  renderShopName = (record) => {
    console.log(`record==========1==============${record}`);
    return <div>{record ? record.shopname : ''}</div>;
  };

  /**
   * 设置每一行的样式名称
   */
  getRowClassName = (record) => {
    if (record.status === 0) {
      return 'highlight-row';
    }
  };

  updateCart = (cart) => {
    CallApi('/od/cart/delete', { id: cart.id }, 'POST', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        Feedback.toast.success('删除成功!');
        this.getTableData();
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }

  /**
   * 渲染操作行
   */
  renderOperation = (value, index, record) => {
    return (
      <div>
        <a href="javasript:void(0)" style={styles.orderDetailLink} onClick={this.detailShop.bind(this, record.goodPo)}>
          查看&nbsp;&nbsp;
        </a>
        <DeleteBalloon
          handleRemove={() => { console.log('111111111111111111'); this.updateCart(record); }}
        />
      </div>
    );
  };

  /**
   * 选中当前行的回调
   */
  handleRowSelection = (selectedRowKeys, records) => {
    console.log('selectedRowKeys:', selectedRowKeys);
    console.log('records:', records);
    this.setState({
      selectedRowKeys,
      records,
    });
  };

  toCreateTrade = () => {
    const selectedRowKeys = this.state.selectedRowKeys;
    const tableData = this.state.tableData;
    const records = this.state.records;
    if (selectedRowKeys.length > 0) {
      let gooids = '';
      let goodMap = {};
      records.map((item) => {
        gooids = gooids ? (`${gooids},${item.goodid}`) : item.goodid;
        goodMap[item.goodid] = item.sum;
      });
      console.log('selectedRowKeys');
      CallApi('/od/trade/add', { shopcode: tableData[0].shopPo.shopcode, goodids: gooids, goodsMap: goodMap, cartids: selectedRowKeys.toString() }, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          Feedback.toast.success('下单成功');
          this.getTableData();
          this.toGetCartCount();
          this.setState({
            selectedRowKeys: [],
            records: [],
          });
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    } else {
      Feedback.toast.error('请选择至少一项！');
    }
  }

  toGetCartCount = () => {
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

  detailShop = (record, e) => {
    e.preventDefault();
    console.log('record===', record);
    this.setState({
      detailVisible: true,
      good: record,
    });
  };

  detailGoodBack = (visible) => {
    this.setState({
      detailVisible: visible,
      good: {},
    });
  }


  toGetTotalPrice = () => {
    let totalPrice = 0;
    const selectedRowKeys = this.state.selectedRowKeys;
    const records = this.state.records;
    if (selectedRowKeys.length > 0) {
      records.map((item) => {
        totalPrice = Number(totalPrice) + (Number(item.price) * Number(item.sum));
      });
    }
    console.log('totalPrice=====', totalPrice);
    return totalPrice.toFixed(2);
  }

  render() {
    const rowSelection = {
      onChange: this.handleRowSelection,
      mode: 'multiple',
    };

    const { tableData, detailVisible, good } = this.state;
    console.log('tableData========================', tableData);

    return (
      <div className="order-list" style={styles.orderList}>
        <IceContainer title="购物车列表">
          {
            tableData.map((item, index) => {
              return (
                <div style={{ marginTop: '40px' }} key={index} >
                  <div style={{ paddingTop: '1px', background: 'rgb(221, 221, 221)', textAlign: 'center', paddingBottom: '10px' }}>
                    <IceTitle decoration={false}>
                      {item.shopPo ? item.shopPo.shopname : ''}
                    </IceTitle>
                  </div>
                  <Table
                    dataSource={item.cartVoList}
                    getRowClassName={this.getRowClassName}
                    rowSelection={rowSelection}
                    hasBorder={false}
                  >
                    <Table.Column
                      cell={this.renderGoodInfo}
                      title="菜品"
                      width={300}
                    />
                    <Table.Column
                      cell={this.renderGoodSum}
                      title="数量"
                      width={120}
                    />
                    <Table.Column
                      cell={this.renderOrderPrice}
                      title="价格"
                      width={120}
                    />
                    <Table.Column
                      cell={this.renderOperation}
                      title="操作"
                      width={100}
                    />
                  </Table>
                </div>
              );
            })
          }
        </IceContainer>
        <IceContainer style={styles.filterCard}>
          <div>
            <span>总价：<span style={{ color: 'red' }}>{this.toGetTotalPrice()}</span> 元</span>
          </div>
          <Button type="primary" size="large" onClick={() => this.toCreateTrade()}>结算</Button>
        </IceContainer>
        <DetailGood detailVisible={detailVisible} good={good} onBack={this.detailGoodBack} />
      </div>
    );
  }
}

const styles = {
  orderImg: {
    width: '60px',
    height: '60px',
    float: 'left',
    marginRight: '10px',
  },
  orderDetailLink: {
    textDecoration: 'none',
  },
  btnWrapper: {
    textAlign: 'center',
    marginTop: '15px',
  },
  orderDescription: {
    textAlign: 'center',
  },
  filterCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
