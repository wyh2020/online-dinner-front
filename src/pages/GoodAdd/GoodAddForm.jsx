import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import {
  Grid,
  Step,
  Icon,
  Feedback,
} from '@icedesign/base';

import ItemForm from './ItemForm';
import DeliveryForm from './DeliveryForm';
import CallApi from '../../util/Api';

const { Row, Col } = Grid;

export default class GoodAddForm extends Component {
  static displayName = 'GoodAddForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      value: {},
    };
  }

  nextStep = (value) => {
    const step = this.state.step;
    console.log('step====', step);
    console.log('value====', value);
    if (step === 0) {
      CallApi('/od/good/add', value, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          this.setState({
            step: this.state.step + 1,
            value: res,
          });
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    }
    if (step === 1) {
      CallApi('/od/good/update', value, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          this.setState({ step: this.state.step + 1 });
          setTimeout(() => {
            hashHistory.push('/good/list');
          }, 300);
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    }
  };

  renderStep = (step) => {
    const value = this.state.value;
    if (step === 0) {
      return <ItemForm onSubmit={this.nextStep} />;
    }

    if (step === 1) {
      return <DeliveryForm value={value} onSubmit={this.nextStep} />;
    }

    if (step === 2) {
      return (
        <div style={styles.content}>
          <h2>
            <Icon type="success" style={styles.icon} size="xl" />
            完成发布
          </h2>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="step-form">
        <IceContainer title="发布菜品">
          <Row wrap>
            <Col xxs="24" s="5" l="5" style={styles.formLabel}>
              <Step
                current={this.state.step}
                direction="vertical"
                type="dot"
                animation={false}
                style={styles.step}
              >
                <Step.Item title="步骤1" content="录入菜品信息" />
                <Step.Item title="步骤2" content="选择菜品图片" />
                <Step.Item title="步骤3" content="完成发布" />
              </Step>
            </Col>
            <Col xxs="24" s="18" l="18">
              {this.renderStep(this.state.step)}
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  step: {
    marginBottom: '20px',
  },
  content: {
    height: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    color: '#1DC11D',
    marginRight: '10px',
  },
};
