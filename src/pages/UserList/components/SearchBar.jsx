import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker } from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default class SearchBar extends Component {
  static displayName = 'SearchBar';

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <Row wrap>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
              <IceFormBinder>
                <Input name="name" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>手机号</label>
              <IceFormBinder>
                <Input name="phone" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>性别</label>
              <IceFormBinder>
                <Select name="sex" placeholder="请选择">
                  <Select.Option value="1">男</Select.Option>
                  <Select.Option value="2">女</Select.Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>创建时间</label>
              <IceFormBinder
                valueFormatter={(date, strValue) => {
                  return strValue;
                }}
              >
                <DatePicker name="createtime" style={styles.filterTool} />
              </IceFormBinder>
            </Col>
          </Row>
          <div
            style={{
              textAlign: 'left',
              marginLeft: '12px',
            }}
          >
            <Button
              onClick={this.props.onSubmit}
              type="primary"
              style={{ marginLeft: '10px' }}
            >
              查询
            </Button>
          </div>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
};
