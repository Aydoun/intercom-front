import React, { PureComponent, Fragment } from 'react';
import { bool, array } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Skeleton, Icon, List, Popconfirm, Card, Typography } from 'antd';
import { triggerPlanList, triggerLike } from 'actions/plans';
import { clearBreadbrumb } from 'actions/index';
import { displayNumber } from 'utils';

const { Paragraph, Title } = Typography;
const { Meta } = Card;

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
    const { plans: { listFetching, collection } } = this.props;

    return (
      <Skeleton loading={listFetching} active avatar>
        <Title level={3}>My Missions</Title>
        <List
          grid={{ gutter: 8, column: 4 }}
          dataSource={collection}
          renderItem={item => (
            <List.Item
              key={item._id}
            >
              <div className="home__main-list">
                <Card
                  cover={
                    <img
                      src={item.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
                      alt="mission-avatar"
                      className="home__card-avatar"
                    />
                  }
                  size="small"
                  hoverable
                  actions={[
                    <Fragment><Icon type="like" key="like" className="card-icon" onClick={this.registerLike(item._id)} />{displayNumber(item.likes)}</Fragment>,
                    <Popconfirm placement="bottom" key={item._id} title={"Please Confirm"} onConfirm={() => console.log(item._id)} >
                      <Icon type="delete" key="delete" className="card-icon card-icon--red" />
                    </Popconfirm>
                  ]}
                >
                  <Meta
                    title={<Link to={`/plan/${item._id}`}><Title ellipsis level={4}>{item.title}</Title></Link>}
                    description={<Paragraph ellipsis>{item.description}</Paragraph>}
                  />
                </Card>
              </div>

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
