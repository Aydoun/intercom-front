import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Form, Button, Col, Row, Input, Icon } from 'antd';
import { sendFeedback } from 'actions/user';
import { setFeedbackDrawerVisibility } from 'actions/app';

class FeedbackForm extends PureComponent {
  state = { visible: false };

  onClose = () => {
    this.props.setFeedbackDrawerVisibility(false);
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { user: { points } } = this.props;
        const { message } = fieldsValue;
        
        this.props.sendFeedback({ points, message });
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
          visible={this.props.visible}
          placement="left"
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Express yourself">
                  {getFieldDecorator('message', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter a message',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="..." />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div style={{ textAlign: 'right' }}>
            <Button icon="close" onClick={this.onClose} style={{ marginRight: 8 }}>
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
  return bindActionCreators({ sendFeedback, setFeedbackDrawerVisibility }, dispatch);
}

function mapStateToProps({ app, user: { collection } }) {
  return {
    visible: app.feedbackDrawerVisible,
    user: collection,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(FeedbackForm));
