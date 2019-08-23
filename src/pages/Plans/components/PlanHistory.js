import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Timeline, Card } from 'antd';
import { triggerHistory } from 'actions/repository';
import { readableDate } from 'utils';

class PlanHistory extends PureComponent {
  static propTypes = {
    plan: object,
  };

  componentDidMount() {
    const { plan } = this.props;

    const bPlab = Object.keys(plan).length > 0 ? plan : { repoName: 'c6975c80-c19f-11e9-9875-5ded6f48e86c' };
    this.props.triggerHistory({ repoName: bPlab.repoName });
  }

  render() {
    const { repoHistory } = this.props;

    return (
      <div className="plans">
        <div className="plans__history">
          <Timeline>
          {
            repoHistory.map(item => (
                <Timeline.Item key={item.sha} >
                  <Link to={`/history/${item.sha}`}>
                    <Card title={item.author} extra={readableDate(item.date)} hoverable >
                      <span>{ item.comment }</span>
                    </Card>
                  </Link>
                </Timeline.Item>
            ))
          }
          </Timeline>
        </div>
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
