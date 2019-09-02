import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Avatar, Button, Menu, Dropdown } from 'antd';
import FeedbackDrawer from 'blocks/Feedback';
import { setFeedbackDrawerVisibility } from 'actions/app';
import { formatName, displayNumber } from 'utils';

const { Meta } = Card;

const SettingsMenu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);

class Profile extends PureComponent {
  openFeedbackDrawer = () => {
    this.props.setFeedbackDrawerVisibility(true);
  } 

  render() {
    const { collection, fetching } = this.props;

    return (
      <Fragment>
        <Card
          style={{ width: 350 }}
          actions={[
            <Button type="link">Invite</Button>,
            <Button type="link" onClick={this.openFeedbackDrawer}>Feedback</Button>,
            (
              <Dropdown overlay={SettingsMenu} trigger={['click']}>
                <Button icon="setting" shape="circle" />
              </Dropdown>
            )
          ]}
          loading={fetching}
        >
          <Meta
            avatar={<Link to="/profile">
              <Avatar style={{ color: '#000', backgroundColor: '#f0f5ff' }} size={64} src={collection.avatar}>
                {formatName(collection.name)}
              </Avatar>
            </Link>}
            title={<Link to="/profile">{collection.name}</Link>}
            description={<Link to="/profile/points" >{`${displayNumber(collection.points)} Points`}</Link>}
          />
        </Card>
        <FeedbackDrawer />
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFeedbackDrawerVisibility }, dispatch);
}

function mapStateToProps({ user: { collection, fetching } }) {
  return {
    collection,
    fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
