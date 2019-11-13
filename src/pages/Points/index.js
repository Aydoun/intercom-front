import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { triggerActivity } from 'actions/user';
import Card from 'components/Card';
import { Tag } from 'antd';
import { readableDate } from 'utils';

class PointsSummary extends PureComponent {
  static propTypes = {
  }

  componentDidMount() {
    this.props.triggerActivity({});
  }

  render() {
    const { activityList } = this.props;

    return (
      <Fragment>
        { activityList.map(item => (
          <Card 
            key={item._id} 
            text={`${item.actionType} -- ${item.value}`} 
            icon="crown" 
            extra={<Tag color="geekblue">{ readableDate(item.createdAt) }</Tag>}
          />
        ))}
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerActivity }, dispatch);
}

function mapStateToProps({ user: { activity: { history } } }) {
  return {
    activityList: history,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PointsSummary);
