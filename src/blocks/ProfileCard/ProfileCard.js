import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Avatar, Button, Menu, Dropdown, Icon } from 'antd';
import FeedbackDrawer from 'blocks/Feedback';
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
  render() {
    const { collection, fetching } = this.props;

    return (
      <Fragment>
        <Card
          style={{ width: 250 }}
          actions={[
            <Button type="link">Invite</Button>,
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
              <Avatar className="app__avatar" size={64} src={collection.avatar}>
                {formatName(collection.name)}
              </Avatar>
            </Link>}
            title={<Link to="/profile">{collection.name}</Link>}
            description={<Link to="/profile/points" className="app__menu-points" >
            <Icon type="crown" className="app__menu-crown" />
            {`${displayNumber(collection.points)}`}</Link>}
            />
        </Card>
        <FeedbackDrawer />
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

function mapStateToProps({ user: { collection, fetching } }) {
  return {
    collection,
    fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
