import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Form, Button, Col, Row, Input, Rate, Icon } from 'antd';
import { setIssueDrawerVisibility } from 'actions/app';

const priorities = ['low', 'medium', 'high'];
class IssuesForm extends PureComponent {
  state = { visible: false };

  onClose = () => {
    this.props.setIssueDrawerVisibility(false);
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log('fieldsValue', fieldsValue);
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Drawer
          title={<span><Icon type="plus" /> Add an issue</span>}
          width={420}
          onClose={this.onClose}
          visible={this.props.visible}
          placement="right"
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Title">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter a Title' }],
                  })(<Input placeholder="Please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Priority">
                  {getFieldDecorator('priority', {
                    rules: [{ required: true, message: 'Please indicate a priority' }],
                    initialValue: 1
                  })(<Rate count={3} tooltips={priorities} character={<Icon type="fire" />} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description">
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'please enter a description',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="description..." />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setIssueDrawerVisibility }, dispatch);
}

function mapStateToProps({ app }) {
  return {
    visible: app.issueDrawerVisible
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(IssuesForm));
