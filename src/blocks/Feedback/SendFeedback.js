import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Form, Button, Col, Row, Input, Icon } from 'antd';
import { sendFeedback } from 'actions/user';

class FeedbackForm extends PureComponent {
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
          title={<span><Icon type="customer-service" /> What's on your mind?</span>}
          width={420}
          onClose={this.onClose}
          visible={true}
          placement="right"
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="">
                  {getFieldDecorator('message', {
                    rules: [
                      {
                        required: true,
                        message: 'please enter a description',
                      },
                    ],
                  })(<Input.TextArea rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div style={{ textAlign: 'right' }}>
            <Button icon="rollback" onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button icon="save" onClick={this.onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendFeedback }, dispatch);
}

function mapStateToProps({ app }) {
  return {
    visible: app.issueDrawerVisible
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(FeedbackForm));
