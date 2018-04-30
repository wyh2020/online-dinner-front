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
} from '@icedesign/base';
import CallApi from '../../util/Api';

const { Row, Col } = Grid;

export default class ClasssAddForm extends Component {
  static displayName = 'ClasssAddForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
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
        name: '',
      },
    });
  }

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        return;
      }
      CallApi('/od/class/add', value, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          Feedback.toast.success('创建成功');
          hashHistory.push('/class/list');
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    });
  };

  render() {
    return (
      <div className="grouped-form">
        <IceContainer title="新增分类" style={styles.container}>
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
                      分类名称：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="name">
                        <Input
                          size="large"
                          required
                          placeholder="请输入分类名称"
                          message="分类名称必须填写"
                          style={{ width: '100%' }}
                        />
                      </IceFormBinder>
                      <IceFormError name="name" />
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
