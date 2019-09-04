import React, { Fragment, PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar, Descriptions, Badge, Divider, Upload } from 'antd';
import { saveUser } from 'actions/user';
import { showError } from 'actions/index';
import { readableDate, getToken } from 'utils';
import { endpoints } from 'config';

const defaultUploadProps = {
  name: 'file',
  action:`${endpoints.IMAGEUPLOAD}?token=${getToken()}`,
  headers: {
    authorization: 'authorization-text',
  },
  showUploadList: false,
};

class Profile extends PureComponent {
  onChange = (info) => {
    const { showError, saveUser, user: { collection } } = this.props;

    if (info.file.status === 'done') {
      const { response: serviceResponse, status } = info.file.response;  
      if (status) {
        saveUser({...collection, avatar: serviceResponse.url});
      } else {
        showError('error', `${info.file.name} file upload failed.`);
      }
    } else if (info.file.status === 'error') {
      showError('error', `${info.file.name} file upload failed.`);
    }
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
          <Descriptions.Item label="Full Name">{collection.name}</Descriptions.Item>
          <Descriptions.Item label="Primary Email">{collection.email}</Descriptions.Item>
          <Descriptions.Item label="Total Plans">{collection.plans}</Descriptions.Item>
          <Descriptions.Item label="Member since">{readableDate(collection.createdAt)}</Descriptions.Item>
          <Descriptions.Item label="Last Update" span={2}>
            {readableDate(collection.updatedAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status="success" text="Active" />
          </Descriptions.Item>
          <Descriptions.Item label="Bio">
            {collection.bio}
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
  return bindActionCreators({ saveUser, showError }, dispatch);
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
