import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Grid,
  Feedback,
  Radio,
} from '@icedesign/base';
import CallApi from '../../util/Api';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

export default class UserAddForm extends Component {
  static displayName = 'UserAddForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        shopname: '',
        address: '',
        tel: '',
        des: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        shopname: '',
        address: '',
        tel: '',
        des: '',
      },
    });
  }

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        return;
      }
      CallApi('/od/user/add', value, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          Feedback.toast.success('创建成功');
          hashHistory.push('/user/list');
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    });
  };

  render() {
    return (
      <div className="grouped-form">
        <IceContainer title="新增用户" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>

              <div style={styles.subForm}>
                <div>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="name">
                        <Input
                          size="large"
                          required
                          placeholder="请输入姓名"
                          message="用户姓名必须填写"
                          style={{ width: '100%' }}
                        />
                      </IceFormBinder>
                      <IceFormError name="name" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      手&nbsp;&nbsp;机&nbsp;&nbsp;号：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="phone">
                        <Input
                          size="large"
                          required
                          placeholder="请输入手机号"
                          message="手机号必须填写"
                          style={{ width: '100%' }}
                        />
                      </IceFormBinder>
                      <IceFormError name="phone" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="sex" >
                        <RadioGroup>
                          <Radio value={1}>男</Radio>
                          <Radio value={2}>女</Radio>
                        </RadioGroup>
                      </IceFormBinder>
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      用户类型：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="type" >
                        <RadioGroup>
                          <Radio value={1}>超级管理员</Radio>
                          <Radio value={2}>商户</Radio>
                          <Radio value={3}>普通客户</Radio>
                        </RadioGroup>
                      </IceFormBinder>
                    </Col>
                  </Row>
                  <Row style={styles.btns}>
                    <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                      {' '}
                    </Col>
                    <Col s="12" l="10">
                      <Button type="primary" onClick={this.submit}>
                        立即创建
                      </Button>
                      <Button style={styles.resetBtn} onClick={this.reset}>
                        重置
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  subForm: {
    marginBottom: '20px',
    marginTop: '50px',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
