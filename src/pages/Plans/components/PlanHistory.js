import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Timeline, Tag } from 'antd';
import Card from 'components/Card';
import { triggerHistory } from 'actions/repository';
import { readableDate } from 'utils';

class PlanHistory extends PureComponent {
  static propTypes = {
    plan: object,
  };

  componentDidMount() {
    const { plan } = this.props;

    if (plan.repoName) {
      this.props.triggerHistory({ repoName: plan.repoName });
    }
  }

  render() {
    const { repoHistory } = this.props;

    return (
      <div className="plans__history">
          <Timeline>
          {
            repoHistory.map(item => (
                <Timeline.Item key={item.sha} >
                  <Link to={`/history/${item.sha}`}>
                    <Card 
                      icon={item.author}
                      text={item.comment} 
                      extra={<Tag color="geekblue">{ readableDate(item.date) }</Tag>} 
                    />  
                  </Link>
                </Timeline.Item>
            ))
          }
          </Timeline>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerHistory }, dispatch);
}

function mapStateToProps({ repository }) {
  return {
    repoHistory: repository.history,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanHistory);
