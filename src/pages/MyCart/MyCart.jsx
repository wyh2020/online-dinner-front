import React, { Component } from 'react';
import { Table, Feedback, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CallApi from '../../util/Api';
import Constant from '../../util/Constant';
import CommonInfo from '../../util/CommonInfo';
import DetailGood from './components/DetailGood';

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
   * 渲染店铺名称
   */
  renderShopName = (record) => {
    return <div>{record.shopname}</div>;
  };

  /**
   * 设置每一行的样式名称
   */
  getRowClassName = (record) => {
    if (record.status === 0) {
      return 'highlight-row';
    }
  };

  /**
   * 渲染操作行
   */
  renderOperation = (value, index, record) => {
    return (
      <a href="javasript:void(0)" style={styles.orderDetailLink} onClick={this.detailShop.bind(this, record.goodPo)}>
        查看
      </a>
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
      records.map((item) => {
        gooids = gooids ? (`${gooids},${item.goodid}`) : item.goodid;
      });
      console.log('selectedRowKeys');
      CallApi('/od/trade/add', { shopcode: tableData[0].shopPo.shopcode, goodids: gooids, cartids: selectedRowKeys.toString() }, 'POST', true).then((res) => {
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

  render() {
    const rowSelection = {
      onChange: this.handleRowSelection,
      mode: 'multiple',
    };

    const { tableData, detailVisible, good } = this.state;
    console.log('tableData=========================', tableData);

    return (
      <div className="order-list" style={styles.orderList}>
        <IceContainer>
          <div style={styles.btnWrapper}>
            <Button type="primary" size="large" onClick={() => this.toCreateTrade()}>结算</Button>
          </div>
        </IceContainer>
        <IceContainer title="购物车列表">
          {
            tableData.map((data, index) => {
              return (
                <Table
                  key={index}
                  dataSource={data.cartVoList}
                  getRowClassName={this.getRowClassName}
                  rowSelection={rowSelection}
                  hasBorder={false}
                >
                  <Table.GroupHeader cell={this.renderShopName(data.shopPo)} />
                  <Table.Column
                    cell={this.renderGoodInfo}
                    title="菜品"
                    dataIndex="record.cartVoList"
                    width={400}
                  />
                  <Table.Column
                    cell={this.renderOrderPrice}
                    title="价格"
                    dataIndex="record.cartVoList"
                    width={120}
                  />
                  <Table.Column
                    cell={this.renderOperation}
                    title="操作"
                    width={100}
                  />
                </Table>
              );
            })
          }
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
};
