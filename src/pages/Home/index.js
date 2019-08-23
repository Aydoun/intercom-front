import React, { PureComponent } from 'react';
import { bool, array } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Skeleton, Icon, List, Avatar, Popconfirm } from 'antd';
import { triggerPlanList } from 'actions/plans';
import { formatName, displayNumber } from 'utils';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Home extends PureComponent {
  static propTypes = {
    listFetching: bool,
    collection: array,
  };

  componentDidMount() {
    this.props.triggerPlanList();
  }
  render() {
    const { plans: { listFetching, collection } } = this.props;

    return (
      <Skeleton loading={listFetching} active avatar>
        <List
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={collection}
        renderItem={item => (
          <List.Item
            key={item._id}
            actions={[
              <IconText type="like-o" text={displayNumber(item.points)} key="list-vertical-like-o" />,
              <Popconfirm placement="bottom" key={item._id} title={"Please Confirm"} onConfirm={() => console.log(item._id)} >
                <Icon type="delete" style={{ color: 'crimson' }} />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<Link to={`/plan/${item._id}`}>
                <Avatar style={{ color: '#000', backgroundColor: '#f0f5ff' }} size="large">{formatName(item.title)}</Avatar>
              </Link>}
              title={<Link to={`/plan/${item._id}`}>{item.title}</Link>}
              description={item.description}
            />
          </List.Item>
        )}
      />
      </Skeleton>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerPlanList }, dispatch);
}

function mapStateToProps({ plans }) {
  return {
    plans,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
