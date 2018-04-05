import React, { Component } from 'react';
import { Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';

export default class DetailUser extends Component {
  static displayName = 'DetailUser';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  formatDate = (date) => {
    const pad = n => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    return `${dateStr}`;
  }


  hideDialog = () => {
    const detailVisible = false;
    this.props.onBack(detailVisible);
  };

  renderSex = (record) => {
    const sex = record.sex;
    let sexStr = '未设置';
    if (sex === 1) {
      sexStr = '男';
    } else if (sex === 2) {
      sexStr = '女';
    }
    return sexStr;
  };

  renderType = (record) => {
    const type = record.type;
    let typeStr = '未设置';
    if (type === 2) {
      typeStr = '商户';
    } else if (type === 3) {
      typeStr = '普通客户';
    }
    return typeStr;
  };

  renderState = (record) => {
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
    return stateStr;
  };

  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const user = this.props.user;
    const locale = {
      ok: '关闭',
      cancel: '返回',
    };
    return (
      <Dialog
        className="simple-form-dialog"
        style={simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        title="用户详情"
        {...this.props}
        onOk={this.hideDialog}
        onCancel={this.hideDialog}
        onClose={this.hideDialog}
        isFullScreen
        locale={locale}
        visible={this.props.detailVisible}
      >
        <div className="detail-table">
          <IceContainer>
            <ul style={styles.detailTable}>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>姓名：</div>
                <div style={styles.detailBody}>{user.name}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>手机号：</div>
                <div style={styles.detailBody}>{user.phone}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>性别：</div>
                <div style={styles.detailBody}>{this.renderSex(user)}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>类型：</div>
                <div style={styles.detailBody}>{this.renderType(user)}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>状态：</div>
                <div style={styles.detailBody}>{this.renderState(user)}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>创建时间：</div>
                <div style={styles.detailBody}>
                  <span style={styles.statusProcessing}>{user.createtime ? this.formatDate(new Date(user.createtime)) : null}</span>
                </div>
              </li>
            </ul>
          </IceContainer>
        </div>
      </Dialog>
    );
  }
}

const styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
  },
  statusProcessing: {
    color: '#64D874',
  },
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
