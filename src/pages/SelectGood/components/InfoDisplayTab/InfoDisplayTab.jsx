import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Grid, Feedback } from '@icedesign/base';
import Img from '@icedesign/img';
import CallApi from '../../../../util/Api';
import Constant from '../../../../util/Constant';
import CommonInfo from '../../../../util/CommonInfo';

const { Row, Col } = Grid;

export default class InfoDisplayTab extends Component {
  static displayName = 'InfoDisplayTab';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tabData: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  /**
   * 异步获取数据
   */
  getData = () => {
    const shopInfo = this.props.shopInfo;
    CallApi('/od/good/queryPageList', { shopcode: shopInfo.shopcode }, 'GET', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        console.log('res===', res);
        this.setState({
          tabData: res.dataList || [],
        });
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  };

  toSelectGood = (item) => {
    console.log('item======', item);
    const shopInfo = this.props.shopInfo;
    CallApi('/od/cart/add', { shopcode: shopInfo.shopcode, goodid: item.goodid, price: item.price }, 'POST', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        Feedback.toast.success('成功加入购物车！');
        this.toRefreshCart();
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }

  toRefreshCart = () => {
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

  renderContent = (data) => {
    return data.map((item, index) => {
      const imgUrl = Constant.goodImgs[item.img || 0];
      return (
        <Col xxs="24" s="12" l="8" key={index}>
          <div style={styles.columnCard}>
            <div style={styles.cardTitle}>{item.name}</div>
            <div style={styles.cardDescWrapper}>
              <div>
                <Img key={index}
                  width={80}
                  height={80}
                  src={imgUrl}
                  type="cover"
                  style={{ border: '1px solid #ccc', margin: '10px', verticalAlign: 'middle' }}
                />
              </div>
              <div>
                <div style={styles.cardTitle}>{`价格：¥${item.price}`}</div>
              </div>
            </div>
            <div style={styles.cardBtnWrapper}>
              <Button
                type="primary"
                component="a"
                href="javasript:void(0)"
                onClick={() => this.toSelectGood(item)}
                size="large"
              >
                加入购物车
              </Button>
            </div>
          </div>
        </Col>
      );
    });
  };

  render() {
    const { tabData } = this.state;
    const shopInfo = this.props.shopInfo;
    return (
      <div className="info-display-tab">
        <IceContainer title={shopInfo.shopname}>
          <Row wrap gutter={20}>
            {tabData ? this.renderContent(tabData) : '暂无数据'}
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  columnCard: {
    overflow: 'hidden',
    boxShadow:
      '0px 0px 2px 0px rgba(0, 0, 0, 0.1),0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
    background: '#fff',
    height: '280px',
    marginBottom: '20px',
  },
  cardDescWrapper: {
    marginTop: '20px',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '22px',
  },
  cardDesc: {
    padding: '0 20px',
    height: '144px',
    overflow: 'hidden',
    lineHeight: '24px',
    fontSize: '14px',
    color: '#666',
    margin: '5px auto 0 auto',
  },
  cardBtnWrapper: {
    textAlign: 'center',
    marginTop: '15px',
  },
};
