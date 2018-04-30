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

export default class EditGood extends Component {
  static displayName = 'EditGood';

  constructor(props) {
    super(props);
    this.state = {
      good: {},
      isMobile: false,
      goodTypes: [],
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
    CallApi('/od/class/queryPageList', {}, 'GET', true).then((res) => {
      if (res.result === 'fail') {
        // Feedback.toast.error(res.msg);
      } else {
        this.setState({
          goodTypes: res.dataList,
        });
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
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
    this.refForm.validateAll((error, good) => {
      if (error) {
        return;
      }
      console.log('good====', good);
      CallApi('/od/good/update', good, 'POST', true).then((res) => {
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

  onFormChange = (good) => {
    console.log('good====', good)
    this.setState({
      good,
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
    const good = this.props.good;
    console.log('good=========', good);
    const goodTypes = this.state.goodTypes;
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
          value={good}
          onChange={this.onFormChange}
        >
          <div style={styles.dialogContent}>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>菜名</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  required
                  min={2}
                  message="菜名必填"
                  name="name"
                >
                  <Input
                    name="name"
                    style={styles.input}
                    placeholder="输入用户菜名"
                  />
                </IceFormBinder>
                <IceFormError name="user.name" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>价格</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  required
                  name="price"
                  message="价格必填"
                >
                  <Input
                    name="price"
                    style={styles.input}
                    placeholder="输入价格"
                  />
                </IceFormBinder>
                <IceFormError name="price" />
              </Col>
            </Row>
            <Row style={styles.formRow}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>菜系</label>
              </Col>
              <Col span={`${isMobile ? '18' : '20'}`}>
                <IceFormBinder name="type" >
                  <RadioGroup>
                    {
                      goodTypes.map((typeObj, index) => {
                        return (<Radio value={typeObj.id} key={index}>{typeObj.name}</Radio>);
                      })
                    }
                  </RadioGroup>
                </IceFormBinder>
                <IceFormError name="type" />
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
