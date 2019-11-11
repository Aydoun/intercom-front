import React, { Fragment, PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar, Descriptions, Badge, Divider, Upload, Typography } from 'antd';
import { saveUser, updateUser } from 'actions/user';
import { showError } from 'actions/index';
import { readableDate, getToken } from 'utils';
import { endpoints } from 'config';

const { Paragraph, Text } = Typography;

const defaultUploadProps = {
  name: 'file',
  action: `${endpoints.IMAGEUPLOAD}?token=${getToken()}&type=user`,
  headers: {
    authorization: 'authorization-text',
  },
  showUploadList: false,
};

class Profile extends PureComponent {
  onChange = (info) => {
    const { showError, saveUser } = this.props;

    if (info.file.status === 'done') {
      const { response: serviceResponse, status } = info.file.response;
      if (status) {
        saveUser({ avatar: serviceResponse.url });
      } else {
        showError('error', `${info.file.name} file upload failed.`);
      }
    } else if (info.file.status === 'error') {
      showError('error', `${info.file.name} file upload failed.`);
    }
  }

  onInfoChange = item => str => {
    this.props.updateUser({
      [item]: str
    });
  }

  render() {
    const { user: { collection } } = this.props;

    return (
      <Fragment>
        <div className="profile">
          <Upload
            className="profile__avatar-uploader"
            onChange={this.onChange}
            {...defaultUploadProps}
          >
            <Avatar size={128} src={collection.avatar} icon="user" />
          </Upload>
          <Divider />
        </div>
        <Descriptions bordered>
          <Descriptions.Item label="Full Name">
            <Text editable={{ onChange: this.onInfoChange('name') }}>
              {collection.name}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Primary Email">
            <Text editable={{ onChange: this.onInfoChange('email') }}>
              {collection.email}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Total Missions">{collection.plans}</Descriptions.Item>
          <Descriptions.Item label="Member since">{readableDate(collection.createdAt)}</Descriptions.Item>
          <Descriptions.Item label="Last Update" span={2}>
            {readableDate(collection.updatedAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status="success" text="Active" />
          </Descriptions.Item>
          <Descriptions.Item label="Bio">
            <Paragraph ellipsis editable={{ onChange: this.onInfoChange('bio') }}>
              {collection.bio}
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  collection: object,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveUser, showError, updateUser }, dispatch);
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
