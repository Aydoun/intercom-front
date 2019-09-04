import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { Avatar, Descriptions, Badge, Upload } from 'antd';
import { readableDate, getToken } from 'utils';
import { endpoints } from 'config';

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
  };

  state = {
    planAvatar: '',
  };

  onChange = (info) => {
    const { showError } = this.props;

    if (info.file.status === 'done') {
      const { response: serviceResponse, status } = info.file.response;
      if (status) {
        this.setState({ planAvatar: serviceResponse.url })
        // saveUser({...collection, avatar: serviceResponse.url});
      } else {
        showError('error', `${info.file.name} file upload failed.`);
      }
    } else if (info.file.status === 'error') {
      showError('error', `${info.file.name} file upload failed.`);
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
        <Descriptions.Item label="Title">{plan.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{plan.description}</Descriptions.Item>
        <Descriptions.Item label="Created at">{readableDate(plan.createdAt)}</Descriptions.Item>
        <Descriptions.Item label="Last Update">
          {readableDate(plan.updatedAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge status="success" text={plan.status} />
        </Descriptions.Item>
      </Descriptions>
    </div>
    );
  }
}

export default PlanSummary;
