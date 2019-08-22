import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { formatName, displayNumber } from 'utils';

const { Meta } = Card;

class Profile extends PureComponent {

  render() {
    const { collection, fetching } = this.props;

    return (
      <Card
        style={{ width: 300 }}
        actions={[
          <Link to="/logout">Logout</Link>,
          <Link to="/points" >{`${displayNumber(collection.points)} Points`}</Link>
        ]}
        loading={fetching}
      >
        <Meta
          avatar={<Link to="/profile">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={64} src={collection.avatar}>
              {formatName(collection.name)}
            </Avatar>
          </Link>}
          title={<Link to="/profile">{collection.name}</Link>}
          description={collection.email}
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
