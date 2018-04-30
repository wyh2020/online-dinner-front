/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import SearchBar from './components/SearchBar';
import EditShop from './components/EditShop';
import DetailShop from './components/DetailShop';
import CallApi from '../../util/Api';
import DeleteBalloon from './components/DeleteBalloon';

export default class ShopListTable extends Component {
  static displayName = 'ShopListTable';

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
      shop: {},
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    const filterFormValue = this.state.filterFormValue;
    filterFormValue.state = 1;
    console.log('filterFormValue======', filterFormValue);
    CallApi('/od/shop/queryPageList', filterFormValue, 'GET', true).then((res) => {
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

  renderDes = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{record.des}</span>
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
      shop: record,
    });
  };

  editShop = (record, e) => {
    e.preventDefault();
    console.log('record===', record);
    this.setState({
      editVisible: true,
      shop: record,
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
          handleRemove={() => { console.log('111111111111111111'); this.updateShop(record, 9); }}
        />
      </div>
    );
  };

  /**
   * 更新店铺状态
   * @param shop
   */
  updateShop = (shop, shopState) => {
    console.log(122222222222);
    CallApi('/od/user/update', { shopcode: shop.shopcode, state: shopState }, 'POST', true).then((res) => {
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


  editShopBack = (visible) => {
    this.setState({
      editVisible: visible,
      shop: {},
    });
    this.fetchData();
  }

  detailShopBack = (visible) => {
    this.setState({
      detailVisible: visible,
      shop: {},
    });
  }

  render() {
    const { filterFormValue, data, editVisible, detailVisible, shop } = this.state;

    return (
      <div className="filter-table">
        <IceContainer title="店铺列表">
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
              title="店铺名称"
              dataIndex="shopname"
              lock="left"
              width={80}
            />
            <Table.Column title="店铺地址" dataIndex="address" width={185} />
            <Table.Column
              title="联系方式"
              dataIndex="tel"
              width={150}
            />
            <Table.Column
              title="店铺描述"
              cell={this.renderDes}
              width={200}
            />
            <Table.Column
              title="创建时间"
              dataIndex="createtime"
              cell={this.renderCreatetime}
              width={150}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={200}
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
        <EditShop editVisible={editVisible} shop={shop} onBack={this.editShopBack} />
        <DetailShop detailVisible={detailVisible} shop={shop} onBack={this.detailShopBack} />
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
