import React, { PureComponent } from 'react';
import { string, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Input } from 'antd';
import { triggerPlanCreation } from 'actions/plans';

const FormItem = Form.Item;
const { TextArea } = Input;

class addPlan extends PureComponent {
  static propTypes = {
    fetching: bool,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { user } = this.props;
        const params = {
          ...fieldsValue,
          username: user.name,
          email: user.email,
        };
        console.log(params, 22);
        // const { authInfo } = this.props;
        // const params = assign({}, {
        //     author : localStorage.fullName,
        //     authorMail : localStorage.email
        // }, fieldsValue);

        this.props.triggerPlanCreation(params);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fetching } = this.props;
    const config = {
      rules: [{ type: 'string', required: true, message: 'Required Field' }],
    };

    return (
      <div className="plans__creation-form">
        <Form layout="vertical">
            <FormItem
            label="Plan Name"
            colon
            >
              {getFieldDecorator('title', config)(
                  <Input placeholder="name..."/>
              )}
            </FormItem>
            <FormItem
            label="Description"
            colon
            >
              {getFieldDecorator('description', config)(
                  <TextArea rows={8} placeholder="description..." />
              )}
            </FormItem>
            <FormItem >
              <Button
                  type="primary" 
                  loading={fetching}
                  icon="save"
                  onClick={this.handleSubmit}
              >
                  Save
              </Button>
            </FormItem>
        </Form>
      </div> 
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerPlanCreation }, dispatch);
}

function mapStateToProps({ plans, user }) {
  return {
    fetching: plans.fetching,
    user: user.collection,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(addPlan));