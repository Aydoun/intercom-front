import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { Avatar, Descriptions, Badge, Upload, Typography } from 'antd';
import { readableDate, getToken } from 'utils';
import { endpoints } from 'config';

const { Paragraph, Text } = Typography;

const defaultUploadProps = {
  name: 'file',
  headers: {
    authorization: 'authorization-text',
  },
  showUploadList: false,
};

class PlanSummary extends PureComponent {
  static propTypes = {
    plan: object,
    updatePlan: func,
    notify: func,
  };

  state = {
    planAvatar: '',
  };

  onChange = (info) => {
    const { notify } = this.props;

    if (info.file.status === 'done') {
      const { response: serviceResponse, status } = info.file.response;
      if (status) {
        this.setState({ planAvatar: serviceResponse.url })
      } else {
        notify('error', `${info.file.name} file upload failed.`);
      }
    } else if (info.file.status === 'error') {
      notify('error', `${info.file.name} file upload failed.`);
    }
  }

  onInfoChange = item => str => {
    const { plan, updatePlan } = this.props;

    if (plan[item] !== str) {
      updatePlan({
        data: { [item]: str },
        id: plan.id,
      });
    }    
  }

  render() {
    const { planAvatar } = this.state;
    const { plan } = this.props;

    return (
      <div className="plans__overview">
        <Upload
          className="plans__avatar-uploader"
          onChange={this.onChange}
          action={`${endpoints.IMAGEUPLOAD}?token=${getToken()}&type=plan&id=${plan._id}`}
          {...defaultUploadProps}
        >
          <Avatar size={128} src={planAvatar || plan.avatar} icon="project" />
        </Upload>
        <Descriptions bordered className="plans__details">
          <Descriptions.Item label="Title">
            <Text editable={{ onChange: this.onInfoChange('title') }}>
              {plan.title}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Created at">{readableDate(plan.createdAt)}</Descriptions.Item>
          <Descriptions.Item label="Last Update">
            {readableDate(plan.updatedAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status="success" text={plan.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            <Paragraph ellipsis editable={{ onChange: this.onInfoChange('description') }}>
              {plan.description}
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default PlanSummary;
