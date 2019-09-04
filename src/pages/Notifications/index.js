import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Timeline, Button, Icon, Divider, Tag } from 'antd';
import Card from 'components/Card';
import { readableDate } from 'utils';

class Notifications extends PureComponent {
  static propTypes = {

  };

  componentDidMount() {

  }

  render() {
    const notifications = [{ title: 'this is an invitation', id: 1, date: '2019-02-23' }, 
    { title: 'this is an another invitation', id: 2, date: '2019-02-23' }];

    return (
      <div className="notifications">
        <Timeline>
          {
            notifications.map(item => (
              <Timeline.Item key={item.id} >
                <Card
                  key={item.id}
                  icon={<Icon type="notification" />}
                  text={item.title}
                  extra={
                    <Fragment>
                      <Button type="link">Accept</Button>
                      <Divider type="vertical"/>
                      <Button type="link">Reject</Button>
                      <Divider type="vertical"/>
                      <Tag color="geekblue">{ readableDate(item.date) }</Tag>
                    </Fragment>
                  }
                />
              </Timeline.Item>
            ))
          }
        </Timeline>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps({ user, plans }) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
