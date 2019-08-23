import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Descriptions, Badge, Divider, Upload } from 'antd';
import { readableDate } from 'utils';

const Profile = props => {
  const { user: { collection } } = props;

  return (
    <Fragment>
      <div className="profile">
        <Upload className="profile__avatar-uploader">
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
};

Profile.propTypes = {
  collection: object,
};

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
