import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Radio, Grid } from '@icedesign/base';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

export default class ItemForm extends Component {
  static displayName = 'ItemForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        price: '',
        type: '',
        img: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log(value);
      if (!error || error.length === 0) {
        this.props.onSubmit(value);
      }
    });
  };

  render() {
    return (
      <IceFormBinderWrapper
        ref={(formRef) => {
          this.formRef = formRef;
        }}
        value={this.state.value}
        onChange={this.onFormChange}
      >
        <div>
          <h3 style={styles.formTitle}>菜品信息</h3>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              菜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="name">
                <Input
                  required
                  placeholder="请输入菜名"
                  message="菜名必须填写"
                  style={{ width: '100%' }}
                />
              </IceFormBinder>
              <IceFormError name="name" />
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="price">
                <Input
                  required
                  placeholder="请输入价格"
                  message="价格必须填写"
                />
              </IceFormBinder>
              <IceFormError name="price" />
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              菜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系：
            </Col>
            <Col s="12" l="18">
              <IceFormBinder name="type">
                <RadioGroup>
                  <Radio value={1}>鲁菜</Radio>
                  <Radio value={2}>川菜</Radio>
                  <Radio value={3}>粤菜</Radio>
                  <Radio value={4}>闽菜</Radio>
                  <Radio value={5}>苏菜</Radio>
                  <Radio value={6}>浙菜</Radio>
                  <Radio value={7}>湘菜</Radio>
                  <Radio value={8}>徽菜</Radio>
                </RadioGroup>
              </IceFormBinder>
              <IceFormError name="type" />
            </Col>
          </Row>
          <Row>
            <Col offset={3} style={styles.btns}>
              <Button onClick={this.submit} type="primary">
                下一步
              </Button>
            </Col>
          </Row>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    marginTop: '25px',
    marginBottom: '25px',
  },
};
