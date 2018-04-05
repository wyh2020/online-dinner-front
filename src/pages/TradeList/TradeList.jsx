import React, { Component } from 'react';
import { Table, Feedback, Grid, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CallApi from '../../util/Api';
import Constant from '../../util/Constant';
import CommonInfo from '../../util/CommonInfo';
import SingleItem from './components/SingleItem';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const { Row, Col } = Grid;

export default class TradeList extends Component {
  static displayName = 'TradeList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
      tableData: [],
      selectedRowKeys: [],
      records: [],
    };
  }

  componentDidMount() {
    this.getTableData();
  }

  /**
   * 异步获取数据
   */
  getTableData = () => {
    const userCode = this.state.userInfo.usercode;
    CallApi('/od/trade/queryPageList', { usercode: userCode }, 'GET', true).then((res) => {
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
    console.log('渲染菜品信息======', record.goodList);
    const goodList = record.goodList;
    return (
      <Row gutter="20" wrap style={styles.itemRow}>
        {goodList.map((item, key) => {
          return (
            <Col key={key} xxs="24" s="8" l="4">
              <SingleItem key={key} {...item} />
            </Col>
          );
        })}
      </Row>
    );
  };

  /**
   * 渲染订单价格
   */
  renderOrderPrice = (value, index, record) => {
    return <b>{`¥ ${record.price}`}</b>;
  };

  /**
   * 渲染订单状态
   */
  renderOrderState = (value, index, record) => {
    const state = record.state;
    // 1、未支付 2、已支付 3、已取消 9、已删除
    let stateStr = '已发布';
    if (state === 1) {
      stateStr = <span style={styles.processing}>未支付</span>;
    } else if (state === 2) {
      stateStr = <span style={styles.finish}>已支付</span>;
    } else if (state === 3) {
      stateStr = <span style={styles.terminated}>已取消</span>;
    } else if (state === 9) {
      stateStr = <span style={styles.pass}>已删除</span>;
    } else {
      stateStr = <span style={styles.pass}>未知状态</span>;
    }
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{stateStr}</span>
      </div>
    );
  };

  /**
   * 渲染订单编号
   */
  renderTradeNo = (record) => {
    return <div>{`订单编号：${record.tradeno}`}</div>;
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
    const that = this;
    return (
      <div style={styles.titleWrapper}>
        {
          record.state === 1 ?
            <Button size="small" type="primary" style={styles.mg10} onClick={this.toPay.bind(this, record)}>
              支付
            </Button> : null
        }
        {
          record.state === 1 ?
            <Button size="small" type="secondary" style={styles.mg10} onClick={this.updateTrade.bind(this, record, 3)}>
              取消
            </Button> : null
        }
        {
          record.state !== 9 ?
            <DeleteBalloon
              handleRemove={() => { console.log('111111111111111111'); that.updateTrade(record, 9); }}
            /> : null
        }
        {
          record.state === 2 && record.evaluateState === 1 ?
            <EditDialog
              index={index}
              record={record}
              getFormValues={this.getFormValues}
            /> : null
        }
      </div>
    );
  };


  getFormValues = () => {
    this.getTableData();
  };

  /**
   * 支付订单
   * @param trade
   */
  toPay = (trade) => {
    CallApi('/od/pay/add', { tradeno: trade.tradeno }, 'POST', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        Feedback.toast.success('支付成功!');
        this.getTableData();
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }

  /**
   * 更新订单状态
   * @param trade
   */
  updateTrade = (trade, tradeState) => {
    console.log(122222222222);
    CallApi('/od/trade/update', { tradeno: trade.tradeno, state: tradeState }, 'POST', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        Feedback.toast.success(tradeState === 2 ? '取消成功!' : '删除成功!');
        this.getTableData();
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }


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

  render() {
    const rowSelection = {
      onChange: this.handleRowSelection,
      mode: 'multiple',
    };

    const { tableData } = this.state;
    console.log('tableData=========================', tableData);

    return (
      <div className="order-list" style={styles.orderList}>
        <IceContainer title="订单列表">
          <Table
            dataSource={tableData}
            getRowClassName={this.getRowClassName}
            // rowSelection={rowSelection}
            hasBorder={false}
          >
            <Table.GroupHeader cell={this.renderTradeNo} />
            <Table.Column
              cell={this.renderGoodInfo}
              title="菜品"
              width={400}
            />
            <Table.Column
              cell={this.renderOrderPrice}
              title="价格"
              width={80}
            />
            <Table.Column
              cell={this.renderOrderState}
              title="状态"
              width={80}
            />
            <Table.Column
              cell={this.renderOperation}
              title="操作"
              width={180}
            />
          </Table>
        </IceContainer>
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
  processing: {
    color: '#5485F7',
  },
  finish: {
    color: '#64D874',
  },
  terminated: {
    color: '#999999',
  },
  pass: {
    color: '#FA7070',
  },
  mg10: {
    marginRight: '10px',
  },
};
