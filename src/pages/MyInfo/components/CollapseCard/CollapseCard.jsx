import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Icon, Grid, Feedback } from '@icedesign/base';
import CommonInfo from '../../../../util/CommonInfo';
import CallApi from '../../../../util/Api';

const { Row, Col } = Grid;

export default class CollapseCard extends Component {
  static displayName = 'CollapseCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      shopInfo: {},
    };
  }

  componentDidMount = () => {
    const userInfo = JSON.parse(CommonInfo.getODUserInfo()) || {};
    const usercode = userInfo.usercode;
    console.log('usercode======', usercode)
    CallApi('/od/shop/queryByUserCode', { userCode: usercode }, 'GET', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        console.log('res===', res);
        this.setState({
          shopInfo: res || {},
        });
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }


  formatDate = (date) => {
    const pad = n => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    return `${dateStr}`;
  }

  toggleCollapse = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse,
    });
  };

  render() {
    const { collapse, shopInfo } = this.state;
    const collapseStyle = collapse ? styles.collapse : null;
    return (
      <div className="collapse-card">
        <IceContainer>
          <div style={styles.summaryInfo}>
            <img
              style={styles.itemLogo}
              src="https://img.alicdn.com/tfs/TB1EBQ.hZLJ8KJjy0FnXXcFDpXa-300-300.png"
              alt=""
            />
            <div style={styles.infoIntro}>
              <h3 style={styles.infoTitle}>{shopInfo.shopname}</h3>
              <p style={styles.infoDesc}>
                {shopInfo.des || '该店铺暂时没描述哦！！'}
              </p>
            </div>
          </div>
          <Row style={{ ...styles.baseInfo, ...collapseStyle }}>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>店铺名称：</span>
              <span style={styles.infoItemValue}>{shopInfo.shopname}</span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>店铺地址：</span>
              <span style={styles.infoItemValue}>{shopInfo.address}</span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>联系方式：</span>
              <span style={styles.infoItemValue}>{shopInfo.tel}</span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>创建时间：</span>
              <span style={styles.infoItemValue}>{this.formatDate(new Date(shopInfo.createtime))}</span>
            </Col>
          </Row>
          <div className="toggle-btn" style={styles.toggleBtn}>
            <a
              className="toggle-btn"
              style={styles.toggleBtn}
              onClick={this.toggleCollapse}
            >
              <span style={{ marginRight: '5px' }}>
                {collapse ? '更多信息' : '收起'}
              </span>
              <Icon size="xs" type={collapse ? 'arrow-down' : 'arrow-up'} />
            </a>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  collapse: {
    display: 'none',
  },
  summaryInfo: {
    display: 'flex',
    borderBottom: '1px solid #e7e7eb',
  },
  baseInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '20px',
  },
  infoItem: {
    width: '50%',
    marginBottom: '15px',
  },
  infoItemLabel: {
    color: '#999',
  },
  itemLogo: {
    width: '100px',
    height: '100px',
  },
  infoIntro: {
    marginLeft: '20px',
    paddingBottom: '20px',
  },
  infoTitle: {
    fontWeight: 'bold',
  },
  infoDesc: {
    color: '#999',
  },
  toggleBtn: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#999',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};
