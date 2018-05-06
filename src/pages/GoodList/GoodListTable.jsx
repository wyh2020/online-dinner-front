/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import SearchBar from './components/SearchBar';
import EditGood from './components/EditGood';
import DetailGood from './components/DetailGood';
import CallApi from '../../util/Api';
import DeleteBalloon from './components/DeleteBalloon';

export default class GoodListTable extends Component {
  static displayName = 'GoodListTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
      data: {
        dataList: [],
        pageNum: 0,
        pageSize: 20,
        totalCount: 1,
      },
      editVisible: false,
      detailVisible: false,
      good: {},
      goodTypes: [],
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
    CallApi('/od/class/queryPageList', {}, 'GET', true).then((res) => {
      if (res.result === 'fail') {
        // Feedback.toast.error(res.msg);
      } else {
        this.setState({
          goodTypes: res.dataList,
        });
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }

  fetchData = () => {
    const filterFormValue = this.state.filterFormValue;
    console.log('filterFormValue======', filterFormValue);
    CallApi('/od/good/queryPageList', filterFormValue, 'POST', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        console.log('res===', res);
        this.setState({
          data: res || {},
        });
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  };


  formatDate = (date) => {
    const pad = n => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    return `${dateStr}`;
  }

  renderType = (value, index, record) => {
    const goodTypes = this.state.goodTypes;
    let typeStr;
    goodTypes.map((obj) => {
      if (obj.id === record.type) {
        typeStr = obj.name;
      }
    });
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{typeStr}</span>
      </div>
    );
  };

  renderState = (value, index, record) => {
    const state = record.state;
    // 1、已发布 2、未发布 3、已删除
    let stateStr = '已发布';
    if (state === 1) {
      stateStr = '已发布';
    } else if (state === 2) {
      stateStr = '未发布';
    } else if (state === 3) {
      stateStr = '已删除';
    } else {
      stateStr = '未知状态';
    }
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{stateStr}</span>
      </div>
    );
  };

  renderCreatetime = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{this.formatDate(new Date(record.createtime))}</span>
      </div>
    );
  };

  detailShop = (record, e) => {
    e.preventDefault();
    console.log('record===', record);
    this.setState({
      detailVisible: true,
      good: record,
    });
  };

  editShop = (record, e) => {
    e.preventDefault();
    console.log('record===', record);
    this.setState({
      editVisible: true,
      good: record,
    });
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <a href="javasript:void(0)"
          style={styles.operationItem}
          onClick={this.editShop.bind(this, record)}
        >
          编辑
        </a>
        <a href="javasript:void(0)"
          style={styles.operationItem}
          onClick={this.detailShop.bind(this, record)}
        >
          详情
        </a>
        <DeleteBalloon
          handleRemove={() => { console.log('111111111111111111'); this.updateGood(record, 9); }}
        />
      </div>
    );
  };

  /**
   * 更新店铺状态
   * @param shop
   */
  updateGood = (good) => {
    console.log(122222222222);
    CallApi('/od/good/delete', { goodid: good.goodid }, 'POST', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        Feedback.toast.success('删除成功!');
        this.fetchData();
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;

    this.fetchData();
  };

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    this.fetchData();
  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
    this.fetchData();
  };


  editGoodBack = (visible) => {
    this.setState({
      editVisible: visible,
      good: {},
    });
    this.fetchData();
  }

  detailGoodBack = (visible) => {
    this.setState({
      detailVisible: visible,
      good: {},
    });
  }

  render() {
    const { filterFormValue, data, editVisible, detailVisible, good } = this.state;

    return (
      <div className="filter-table">
        <IceContainer title="菜品列表">
          <SearchBar
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={data.dataList}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="序号"
              cell={(value, index) => { return index + 1; }}
              lock="left"
              width={50}
            />
            <Table.Column
              title="菜名"
              dataIndex="name"
              lock="left"
              width={180}
            />
            <Table.Column
              title="价格"
              dataIndex="price"
              cell={(price) => { return `¥${price}`; }}
              width={185}
            />
            <Table.Column
              title="所属类别"
              cell={this.renderType}
              width={200}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              lock="right"
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={data.pageNum}
              pageSize={data.pageSize}
              total={data.totalCount}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
        <EditGood editVisible={editVisible} good={good} onBack={this.editGoodBack} />
        <DetailGood detailVisible={detailVisible} good={good} onBack={this.detailGoodBack} />
      </div>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
