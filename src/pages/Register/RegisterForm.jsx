/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Button, Grid, Feedback, Radio } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './RegisterForm.scss';
import CallApi from '../../util/Api';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

export default class RegisterForm extends Component {
  static displayName = 'RegisterForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        account: undefined,
        passwd: undefined,
        rePasswd: undefined,
        checkbox: false,
        type: '3',
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    console.log('stateValues:', stateValues);
    if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  onChangeType = (value) => {
    console.log(`value-------${value}`);
    const oldValue = this.state.value;
    oldValue.type = value;
    this.setState({
      value: oldValue,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      CallApi('/od/auth/reg', { phone: values.account, password: values.passwd, rePasswd: values.rePasswd, type: Number(values.type) }, 'POST', false).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          console.log(`res=====${res}`);
          // 注册成功后跳转到登录页面
          hashHistory.push('/login');
          Feedback.toast.success('注册成功');
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
      console.log('values', values);
    });
  };

  render() {
    return (
      <div className="register-form">
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>注册</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItems}>
              <Row style={styles.formItem}>
                <Col>
                  <IceIcon
                    type="person"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder name="account" required message="必填">
                    <Input maxLength={20} placeholder="手机号" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="account" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="passwd"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请输入密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="passwd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="rePasswd"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <RadioGroup value={this.state.value.type} onChange={this.onChangeType}>
                    <Radio id="shop" value="2" checked={this.state.value.type === '2'}>
                      商户
                    </Radio>
                    <Radio id="customer" value="3" checked={this.state.value.type === '3'}>
                      普通用户
                    </Radio>
                  </RadioGroup>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  注 册
                </Button>
              </Row>

              <Row className="tips" style={styles.tips}>
                <a href="javasript:void(0)" onClick={() => hashHistory.push('/login')} style={styles.link}>
                  立即登录
                </a>
                <span style={styles.line}>|</span>
                <a href="javasript:void(0)" onClick={() => hashHistory.push('/pwd')} style={styles.link}>
                  忘记密码
                </a>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    );
  }
}

const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '5px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
