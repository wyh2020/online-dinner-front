import React, { Component } from 'react';
import { Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';

export default class DetailGood extends Component {
  static displayName = 'DetailGood';

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

  renderType = (record) => {
    const type = record.type;
    let typeStr;
    if (type === 1) {
      typeStr = '鲁菜';
    } else if (type === 2) {
      typeStr = '川菜';
    } else if (type === 3) {
      typeStr = '粤菜';
    } else if (type === 4) {
      typeStr = '闽菜';
    } else if (type === 5) {
      typeStr = '苏菜';
    } else if (type === 6) {
      typeStr = '浙菜';
    } else if (type === 7) {
      typeStr = '湘菜';
    } else if (type === 8) {
      typeStr = '徽菜';
    }
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{typeStr}</span>
      </div>
    );
  };

  renderState = (record) => {
    console.log('record=====1212====', record);
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

  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const good = this.props.good;
    console.log('good====12121122=======', good);
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
                <div style={styles.detailTitle}>菜名：</div>
                <div style={styles.detailBody}>{good.name}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>价格：</div>
                <div style={styles.detailBody}>{good.price}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>菜系：</div>
                <div style={styles.detailBody}>{this.renderType(good)}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>创建时间：</div>
                <div style={styles.detailBody}>
                  <span style={styles.statusProcessing}>{good.createtime ? this.formatDate(new Date(good.createtime)) : null}</span>
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
