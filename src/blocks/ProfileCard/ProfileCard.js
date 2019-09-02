import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Avatar, Button, Menu, Dropdown, Popover } from 'antd';
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
      <Card
        style={{ width: 350 }}
        actions={[
          <Popover
            content={"Gaga on the house"}
            trigger="click"
            placement="bottom"
          >
            <Button type="link">Invite</Button>
          </Popover>,
          <Popover
            content={"Gaga on the house"}
            trigger="click"
            placement="bottom"
            >
            <Button type="link">Feedback</Button>,
          </Popover>,
          
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
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps({ user: { collection, fetching } }) {
  return {
    collection,
    fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
