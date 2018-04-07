/* eslint react/jsx-no-target-blank: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Grid, Feedback } from '@icedesign/base';
import './DisplayCard.scss';
import CommonInfo from '../../../../util/CommonInfo';
import CallApi from '../../../../util/Api';

const { Row, Col } = Grid;

export default class extends Component {
  static displayName = '';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      countAllBo: {},
      userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
    };
  }

  componentDidMount = () => {
    const userInfo = this.state.userInfo;
    if (userInfo.type === 1) {
      CallApi('/od/count/countAll', null, 'GET', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          this.setState({
            countAllBo: res,
          });
          console.log('res===', res);
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    }
  }

  render() {
    const { countAllBo } = this.state;

    return (
      <IceContainer className="display-card-container" style={styles.container}>
        <Row wrap>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title} className="title">
              总用户数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
                      alt=""
                      width="12"
                      height="12"
                    />
                  }
                  triggerType="hover"
                  closable={false}
                >
                  总用户数
                </Balloon>
              </span>
            </div>
            <div className="count" style={styles.count}>
              {countAllBo.countUser}
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title} className="title">
              总店铺数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
                      alt=""
                      width="12"
                      height="12"
                    />
                  }
                  triggerType="hover"
                  closable={false}
                >
                  总店铺数
                </Balloon>
              </span>
            </div>
            <div style={styles.count} className="count">
              {countAllBo.countShop}
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title} className="title">
              总订单数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
                      alt=""
                      width="12"
                      height="12"
                    />
                  }
                  triggerType="hover"
                  closable={false}
                >
                  总订单数
                </Balloon>
              </span>
            </div>
            <div style={styles.count} className="count">
              {countAllBo.countTrade}
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title} className="title">
              总菜品数
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={
                    <img
                      src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
                      alt=""
                      width="12"
                      height="12"
                    />
                  }
                  triggerType="hover"
                  closable={false}
                >
                  总菜品数
                </Balloon>
              </span>
            </div>
            <div style={styles.count} className="count">
              {countAllBo.countGood}
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '3px',
  },
  desc: {
    fontSize: '12px',
  },
  down: {
    width: '6px',
    height: '9px',
  },
  up: {
    width: '6px',
    height: '9px',
  },
  extraIcon: {
    marginLeft: '5px',
    position: 'relative',
    top: '1px',
  },
};
