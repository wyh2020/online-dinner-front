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

export default class EditClasss extends Component {
  static displayName = 'EditClasss';

  constructor(props) {
    super(props);
    this.state = {
      classs: this.props.classs,
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
    this.refForm.validateAll((error, classs) => {
      if (error) {
        return;
      }
      console.log('classs====', classs);
      CallApi('/od/class/update', classs, 'POST', true).then((res) => {
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

  onFormChange = (classs) => {
    this.setState({
      classs,
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
    const classs = this.props.classs;

    return (
      <Dialog
        className="simple-form-dialog"
        style={simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        title="编辑分类"
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
          value={classs}
          onChange={this.onFormChange}
        >
          <div style={styles.dialogContent}>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>分类名称</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  required
                  min={2}
                  max={10}
                  message="当前字段必填，且最少 2 个字最多 10 个字"
                >
                  <Input
                    name="name"
                    style={styles.input}
                    placeholder="输入分类名称"
                  />
                </IceFormBinder>
                <IceFormError name="name" />
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
