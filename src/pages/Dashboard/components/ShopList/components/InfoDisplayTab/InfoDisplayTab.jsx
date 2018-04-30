import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import { Button, Grid } from '@icedesign/base';
import Img from '@icedesign/img';
import IceEllipsis from '@icedesign/ellipsis';
import Constant from '../../../../../../util/Constant';

const { Row, Col } = Grid;

export default class InfoDisplayTab extends Component {
  static displayName = 'InfoDisplayTab';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

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
      const imgUrl = Constant.shopImgs[0];
      return (
        <Col xxs="24" s="12" l="8" key={index}>
          <div style={styles.columnCard}>
            <div style={styles.cardTitle}>{item.shopname}</div>
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
              <div style={styles.cardDesc}>
                <IceEllipsis lineLimit={2} text={item.des} />
              </div>
              <div>
                <div style={styles.cardItem}>{`位置：${item.address}`}</div>
              </div>
              <div>
                <div style={styles.cardItem}>{`电话：${item.tel}`}</div>
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
    const tabData = this.props.tabData || [];
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
    height: '380px',
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
    height: '50px',
    overflow: 'hidden',
    lineHeight: '24px',
    fontSize: '12px',
    color: '#666',
    margin: '5px auto 0 auto',
  },
  cardItem: {
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '10px',
  },
  cardBtnWrapper: {
    textAlign: 'center',
    marginTop: '15px',
  },
};
