/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import SearchBar from './components/SearchBar';
import EditClasss from './components/EditClasss';
import DetailClasss from './components/DetailClasss';
import CallApi from '../../util/Api';
import DeleteBalloon from './components/DeleteBalloon';

export default class ClasssListTable extends Component {
  static displayName = 'ClasssListTable';

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
      classs: {},
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
    CallApi('/od/class/queryPageList', filterFormValue, 'GET', true).then((res) => {
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

  detailClasss = (record, e) => {
    e.preventDefault();
    console.log('record===', record);
    this.setState({
      detailVisible: true,
      classs: record,
    });
  };

  editClasss = (record, e) => {
    e.preventDefault();
    console.log('record===', record);
    this.setState({
      editVisible: true,
      classs: record,
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
          onClick={this.editClasss.bind(this, record)}
        >
          编辑
        </a>
        <a href="javasript:void(0)"
          style={styles.operationItem}
          onClick={this.detailClasss.bind(this, record)}
        >
          详情
        </a>
      </div>
    );
  };

  /**
   * 更新分类状态
   * @param classs
   */
  updateClasss = (classs, classsState) => {
    console.log(122222222222);
    CallApi('/od/user/update', { classscode: classs.classscode, state: classsState }, 'POST', true).then((res) => {
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


  editClasssBack = (visible) => {
    this.setState({
      editVisible: visible,
      classs: {},
    });
    this.fetchData();
  }

  detailClasssBack = (visible) => {
    this.setState({
      detailVisible: visible,
      classs: {},
    });
  }

  render() {
    const { filterFormValue, data, editVisible, detailVisible, classs } = this.state;

    return (
      <div className="filter-table">
        <IceContainer title="分类列表">
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
              title="分类名称"
              dataIndex="name"
              lock="left"
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
        <EditClasss editVisible={editVisible} classs={classs} onBack={this.editClasssBack} />
        <DetailClasss detailVisible={detailVisible} classs={classs} onBack={this.detailClasssBack} />
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
