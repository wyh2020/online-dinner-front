/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './ChangePasswordForm.scss';
import CallApi from '../../util/Api';

const { Row, Col } = Grid;

export default class ChangePasswordForm extends Component {
  static displayName = 'ChangePasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        oldPasswd: '',
        passwd: '',
        rePasswd: '',
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

  checkOldPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入旧密码');
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

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('values', values);
      if (errors) {
        console.log('errors', errors);
        return;
      }
      CallApi('/od/auth/updatePassword', { oldPwd: values.oldPasswd, password: values.passwd, confirmPassword: values.rePasswd }, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          console.log('res===', res);
          Feedback.toast.success('修改成功');
          hashHistory.push('/login');
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    });
  };

  render() {
    return (
      <div className="change-password-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>修改密码</h2>

              <Row wrap style={styles.formItem}>
                <Col xxs="7" s="4" l="3" style={styles.formLabel}>
                  旧密码：
                </Col>
                <Col xxs="16" s="10" l="7">
                  <IceFormBinder
                    name="oldPasswd"
                    required
                    validator={this.checkOldPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请重新输入旧密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="oldPasswd" />
                </Col>
              </Row>

              <Row wrap style={styles.formItem}>
                <Col xxs="7" s="4" l="3" style={styles.formLabel}>
                  新密码：
                </Col>
                <Col xxs="16" s="10" l="7">
                  <IceFormBinder
                    name="passwd"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请重新输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="passwd" />
                </Col>
              </Row>

              <Row wrap style={styles.formItem}>
                <Col xxs="7" s="4" l="3" style={styles.formLabel}>
                  确认密码：
                </Col>
                <Col xxs="16" s="10" l="7">
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
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row wrap style={{ marginTop: 20 }}>
            <Col xxs={{ offset: 6 }} s={{ offset: 3 }}>
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
