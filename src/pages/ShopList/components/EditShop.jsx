import React, { Component } from 'react';
import { Dialog, Grid, Input, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import CallApi from '../../../util/Api';

const { Row, Col } = Grid;

export default class EditShop extends Component {
  static displayName = 'EditShop';

  constructor(props) {
    super(props);
    this.state = {
      shop: this.props.shop,
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
    this.refForm.validateAll((error, shop) => {
      if (error) {
        return;
      }
      console.log('shop====', shop);
      CallApi('/od/shop/update', shop, 'POST', true).then((res) => {
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

  onFormChange = (shop) => {
    this.setState({
      shop,
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
    const shop = this.props.shop;

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
          value={shop}
          onChange={this.onFormChange}
        >
          <div style={styles.dialogContent}>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>店铺名称</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  required
                  min={2}
                  max={10}
                  message="当前字段必填，且最少 2 个字最多 10 个字"
                >
                  <Input
                    name="shopname"
                    style={styles.input}
                    placeholder="输入店铺名称"
                  />
                </IceFormBinder>
                <IceFormError name="shopname" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>店铺地址</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  max={50}
                  message="店铺地址最多 50 个字"
                >
                  <Input
                    name="address"
                    style={styles.input}
                    placeholder="输入店铺地址"
                  />
                </IceFormBinder>
                <IceFormError name="address" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>联系方式</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  required
                  message="店铺联系方式不能为空"
                >
                  <Input
                    name="tel"
                    style={styles.input}
                    placeholder="输入店铺联系方式"
                  />
                </IceFormBinder>
                <IceFormError name="tel" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col>
                <IceFormBinder>
                  <Input
                    name="des"
                    style={styles.input}
                    multiple
                    placeholder="请输入店铺描述"
                    rows={4}
                  />
                </IceFormBinder>
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
