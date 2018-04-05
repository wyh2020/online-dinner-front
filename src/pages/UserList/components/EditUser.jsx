import React, { Component } from 'react';
import { Dialog, Grid, Radio, Input, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import CallApi from '../../../util/Api';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

export default class EditUser extends Component {
  static displayName = 'EditUser';

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  hideDialog = () => {
    const editVisible = false;
    this.props.onBack(editVisible);
  };

  onOk = () => {
    this.refForm.validateAll((error, user) => {
      if (error) {
        return;
      }
      console.log('user====', user);
      CallApi('/od/user/update', user, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          console.log('res===', res);
          this.hideDialog();
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    });
  };

  onFormChange = (user) => {
    console.log('user====',user)
    this.setState({
      user,
    });
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
    const user = this.props.user;

    return (
      <Dialog
        className="simple-form-dialog"
        style={simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        title="编辑店铺"
        {...this.props}
        onOk={this.onOk}
        onCancel={this.hideDialog}
        onClose={this.hideDialog}
        isFullScreen
        visible={this.props.editVisible}
      >
        <IceFormBinderWrapper
          ref={(ref) => {
            this.refForm = ref;
          }}
          value={user}
          onChange={this.onFormChange}
        >
          <div style={styles.dialogContent}>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>姓名</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  required
                  min={2}
                  message="用户姓名必填"
                  name="name"
                >
                  <Input
                    name="name"
                    style={styles.input}
                    placeholder="输入用户姓名"
                  />
                </IceFormBinder>
                <IceFormError name="user.name" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>手机号</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  required
                  max={11}
                  name="phone"
                  message="手机号最多 11 个字"
                >
                  <Input
                    name="phone"
                    style={styles.input}
                    placeholder="输入手机号"
                  />
                </IceFormBinder>
                <IceFormError name="phone" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>性别</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder name="sex" >
                  <RadioGroup>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </RadioGroup>
                </IceFormBinder>
                <IceFormError name="sex" />
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>
      </Dialog>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
