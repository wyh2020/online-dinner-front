import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Button,
  Grid,
  Radio,
} from '@icedesign/base';
import Img from '@icedesign/img';
import Constant from '../../util/Constant';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

export default class DeliveryForm extends Component {
  static displayName = 'DeliveryForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
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
  }

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
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              菜品图片：
            </Col>
            <Col s="12" l="24">
              <IceFormBinder name="img" >
                <RadioGroup>
                  {
                    Constant.goodImgs.map((imgUrl, index) => {
                      return (
                        <Radio value={index} key={index}>
                          <img key={index}
                            width={80}
                            height={80}
                            src={imgUrl}
                            type="cover"
                            alt="菜品图片"
                            style={{ border: '1px solid #ccc', margin: '10px', verticalAlign: 'middle' }}
                          />
                        </Radio>
                      );
                    })
                  }
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
    height: '100px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    marginTop: '25px',
    marginBottom: '25px',
  },
};
