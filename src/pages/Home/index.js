import React, { PureComponent, Fragment } from 'react';
import { bool, array } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Skeleton, Icon, List, Avatar, Popconfirm } from 'antd';
import { triggerPlanList, triggerLike } from 'actions/plans';
import { clearBreadbrumb } from 'actions/index';
import { formatName, displayNumber } from 'utils';

class Home extends PureComponent {
  static propTypes = {
    listFetching: bool,
    collection: array,
  };

  componentDidMount() {
    this.props.triggerPlanList();
    this.props.clearBreadbrumb();
  }

  registerLike = planId => () => {
    this.props.triggerLike(planId);
  }

  render() {
    const { plans: { listFetching, collection, total } } = this.props;

    return (
      <Skeleton loading={listFetching} active avatar>
        <List
          pagination={{
            onChange: page => {
              console.log(page);
            },
            total,
            simple: true
          }}
          dataSource={collection}
          renderItem={item => (
            <List.Item
              key={item._id}
              actions={[
                <Fragment><Icon type="like" className="global__right-margin" onClick={this.registerLike(item._id)}/>{displayNumber(item.likes)}</Fragment>,
                <Popconfirm placement="bottom" key={item._id} title={"Please Confirm"} onConfirm={() => console.log(item._id)} >
                  <Icon type="delete" style={{ color: 'crimson' }} />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<Link to={`/plan/${item._id}`}>
                  <Avatar 
                    src={item.avatar} 
                    className="app__avatar" 
                    size="large"
                  >
                    {formatName(item.title)}
                  </Avatar>
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
  return bindActionCreators({ triggerPlanList, clearBreadbrumb, triggerLike }, dispatch);
}

function mapStateToProps({ plans }) {
  return {
    plans,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
