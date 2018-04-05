import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Feedback } from '@icedesign/base';
import CommonInfo from '../../../../util/CommonInfo';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import CallApi from '../../../../util/Api';

const { Row, Col } = Grid;

export default class BasicDetailInfo extends Component {
  static displayName = 'BasicDetailInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
      edit: false,
    };
  }

  formatDate = (date) => {
    const pad = n => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    return `${dateStr}`;
  }


  toEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  }


  toSave = () => {
    this.setState({
      edit: !this.state.edit,
    });
  }


  formChange = (value) => {
    this.setState({
      value
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('values', values);
      CallApi('/od/user/update', values, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          console.log('res===', res);
          CommonInfo.saveODUserInfo(JSON.stringify(res));
          Feedback.toast.success('修改成功');
          this.setState({
            userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
            edit: false,
          });
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
    });
  };

  toShowDetail = () => {
    const userInfo = this.state.userInfo;
    const sex = userInfo.sex;
    let sexStr;
    if (sex === 1) {
      sexStr = '男';
    } else if (sex === 2) {
      sexStr = '女';
    } else {
      sexStr = '未设置';
    }
    return (
      <IceContainer>
        <h2 style={styles.basicDetailTitle}>基础详情</h2>
        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>基本信息</h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>姓名：</span>
              <span style={styles.infoItemValue}>{userInfo.name}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>手机号码：</span>
              <span style={styles.infoItemValue}>{userInfo.phone}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>性别：</span>
              <span style={styles.infoItemValue}>{sexStr}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>注册时间：</span>
              <span style={styles.infoItemValue}>{this.formatDate(new Date(userInfo.createtime))}</span>
            </Col>
          </Row>
        </div>
        <div style={styles.button}>
          <Button type="primary" size="large" onClick={this.toEdit}>编辑</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </IceContainer>
    );
  }


  toShowEdit = () => {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.userInfo}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>编辑信息</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户名：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required message="必填">
                    <Input
                      size="large"
                      placeholder="请输入用户名"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  手机号：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="phone">
                    <Input
                      size="large"
                      placeholder="请输入手机号"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="phone" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  性别：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="sex">
                    <Select
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请选择..."
                      dataSource={[
                        { label: '男', value: '1' },
                        { label: '女', value: '2' },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                size="large"
                type="primary"
                onClick={this.toEdit}
              >
                返 回
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }

  render() {
    const edit = this.state.edit;
    if (edit) {
      return this.toShowEdit();
    }
    return this.toShowDetail();
  }
}

const styles = {
  basicDetailTitle: {
    margin: '10px 0',
    fontSize: '16px',
  },
  infoColumn: {
    marginLeft: '16px',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 40px',
  },
  infoColumnTitle: {
    margin: '20px 0',
    paddingLeft: '10px',
    borderLeft: '3px solid #3080fe',
  },
  infoItems: {
    padding: 0,
    marginLeft: '25px',
  },
  infoItem: {
    marginBottom: '18px',
    listStyle: 'none',
    fontSize: '14px',
  },
  infoItemLabel: {
    minWidth: '70px',
    color: '#999',
  },
  infoItemValue: {
    color: '#333',
  },
  attachLabel: {
    minWidth: '70px',
    color: '#999',
    float: 'left',
  },
  attachPics: {
    width: '80px',
    height: '80px',
    border: '1px solid #eee',
    marginRight: '10px',
  },
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
