import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import { Button, Grid, Feedback } from '@icedesign/base';
import IceEllipsis from '@icedesign/ellipsis';
import CallApi from '../../../../../../util/Api';

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
    CallApi('/od/shop/queryPageList', null, 'GET', true).then((res) => {
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
    const path = {
      pathname: '/good/select',
      state: item,
    };
    hashHistory.push(path);
  }

  renderContent = (data) => {
    return data.map((item, index) => {
      return (
        <Col xxs="24" s="12" l="8" key={index}>
          <div style={styles.columnCard}>
            <div style={styles.cardTitle}>{item.shopname}</div>
            <div style={styles.cardDescWrapper}>
              <div style={styles.cardDesc}>
                <IceEllipsis lineLimit={6} text={item.des} />
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
                进入店铺
              </Button>
            </div>
          </div>
        </Col>
      );
    });
  };

  render() {
    const { tabData } = this.state;
    return (
      <div className="info-display-tab">
        <IceContainer title="热门店铺">
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
