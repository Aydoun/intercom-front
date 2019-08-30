import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Timeline, Tag, Icon, Button, Empty } from 'antd';
import Card from 'components/Card';
import { readableDate } from 'utils';

class PlanIssues extends PureComponent {
  componentDidMount() {

  }

  render() {
    const issues = [{ title: 'ok', id: 1 }, { title: 'bok', id: 2 }];

    return (
      <div className="plans__issues">
        <div className="plans__issues-create">
          <Button icon="plus" type="primary">Add issue</Button>
        </div>
        {
          issues.length > 0 ? (
            <Timeline>
              {
                issues.map(item => (
                  <Timeline.Item key={item.id} >
                    <Link to={`/issue/${item.id}`}>
                      <Card
                        icon={<Icon type="warning" style={{ color: '#faad14' }} />}
                        text={item.title}
                        extra={<Tag color="geekblue">{readableDate('2019-03-23')}</Tag>}
                      />
                    </Link>
                  </Timeline.Item>
                ))
              }
            </Timeline>
          ) : (
            <Empty />
          )
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps() {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanIssues);
