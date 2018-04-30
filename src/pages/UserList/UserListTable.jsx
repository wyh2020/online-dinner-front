/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import SearchBar from './components/SearchBar';
import EditUser from './components/EditUser';
import DetailUser from './components/DetailUser';
import CallApi from '../../util/Api';
import DeleteBalloon from './components/DeleteBalloon';

export default class UserListTable extends Component {
  static displayName = 'UserListTable';

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
      user: {},
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    const filterFormValue = this.state.filterFormValue;
    console.log('filterFormValue======', filterFormValue);
    filterFormValue.state = 1;
    CallApi('/od/user/queryPageList', filterFormValue, 'GET', true).then((res) => {
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

  renderSex = (value, index, record) => {
    const sex = record.sex;
    let sexStr = '未设置';
    if (sex === 1) {
      sexStr = '男';
    } else if (sex === 2) {
      sexStr = '女';
    }
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{sexStr}</span>
      </div>
    );
  };

  renderType = (value, index, record) => {
    const type = record.type;
    let typeStr = '未设置';
    if (type === 1) {
      typeStr = '管理员';
    } else if (type === 2) {
      typeStr = '商户';
    } else if (type === 3) {
      typeStr = '普通客户';
    }
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{typeStr}</span>
      </div>
    );
  };

  renderState = (value, index, record) => {
    const state = record.state;
    // 1、正常 2、已禁用 3、已删除
    let stateStr = '正常';
    if (state === 1) {
      stateStr = '正常';
    } else if (state === 2) {
      stateStr = '已禁用';
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
      user: record,
    });
  };

  editShop = (record, e) => {
    e.preventDefault();
    console.log('record===', record);
    this.setState({
      editVisible: true,
      user: record,
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
          handleRemove={() => { console.log('111111111111111111'); this.updateUser(record, 9); }}
        />
      </div>
    );
  };

  /**
   * 更新用户状态
   * @param user
   */
  updateUser = (user, userState) => {
    console.log(122222222222);
    CallApi('/od/user/update', { usercode: user.usercode, state: userState }, 'POST', true).then((res) => {
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


  editUserBack = (visible) => {
    this.setState({
      editVisible: visible,
      user: {},
    });
    this.fetchData();
  }

  detailUserBack = (visible) => {
    this.setState({
      detailVisible: visible,
      user: {},
    });
  }

  render() {
    const { filterFormValue, data, editVisible, detailVisible, user } = this.state;

    return (
      <div className="filter-table">
        <IceContainer title="用户列表">
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
              title="姓名"
              dataIndex="name"
              lock="left"
              width={180}
            />
            <Table.Column title="手机号" dataIndex="phone" width={185} />
            <Table.Column
              title="性别"
              dataIndex="sex"
              cell={this.renderSex}
              width={150}
            />
            <Table.Column
              title="类型"
              cell={this.renderType}
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
        <EditUser editVisible={editVisible} user={user} onBack={this.editUserBack} />
        <DetailUser detailVisible={detailVisible} user={user} onBack={this.detailUserBack} />
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
