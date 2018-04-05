import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Feedback, Rating } from '@icedesign/base';
import CallApi from '../../../util/Api';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
      score: 1,
      des: '',
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      const { dataIndex } = this.state;
      console.log('values in form!!!', values);
      CallApi('/od/evaluate/add', { tradeno: values.tradeno, score: this.state.score, des: values.des }, 'POST', true).then((res) => {
        if (res.result === 'fail') {
          Feedback.toast.error(res.msg);
        } else {
          Feedback.toast.success('评价成功!');
        }
      }).catch((err) => {
        Feedback.toast.error(err);
      });
      this.props.getFormValues(dataIndex, values);
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  changeScore = (score) => {
    this.setState({
      score,
    });
  }

  changeDes = (des) => {
    this.setState({
      des,
    });
  }

  render() {
    const init = this.field.init;
    const { index, record } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, record)}
        >
          评价
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="分数：" {...formItemLayout}>
              <Rating defaultValue={1} value={this.state.score} onChange={val => this.changeScore(val)} />
            </FormItem>

            <FormItem label="评价内容：" {...formItemLayout}>
              <Input multiple
                {...init('des', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
