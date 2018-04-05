import React, { Component } from 'react';
import { Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';

export default class DetailShop extends Component {
  static displayName = 'DetailShop';

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

  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    const shop = this.props.shop;
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
        title="店铺详情"
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
                <div style={styles.detailTitle}>店铺名称：</div>
                <div style={styles.detailBody}>{shop.shopname}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>店铺地址：</div>
                <div style={styles.detailBody}>{shop.address}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>联系方式：</div>
                <div style={styles.detailBody}>{shop.tel}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>店铺描述：</div>
                <div style={styles.detailBody}>{shop.des}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>创建时间：</div>
                <div style={styles.detailBody}>
                  <span style={styles.statusProcessing}>{shop.createtime ? this.formatDate(new Date(shop.createtime)) : null}</span>
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
