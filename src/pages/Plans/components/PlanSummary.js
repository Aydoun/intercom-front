import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import Objectkeys from 'object-keys';
import { triggerSummary } from 'actions/repository';
import { Row, Col, Statistic, Typography, Tag } from 'antd';
import { displayNumber } from 'utils';

const { Title } = Typography;

class PlanSummary extends PureComponent {
  static propTypes = {
    plan: object,
    triggerSummary: func,
  };

  componentDidMount() {
    const { plan } = this.props;
    
    if (plan.repoName) {
      this.props.triggerSummary({ id: plan._id, repoName: plan.repoName });
    }
  }

  render() {
    const { summary } = this.props;
    const contributors = summary.contributors;
    
    return (
      <div className="plans__history">
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Total Contributions" value={summary.totalContributions} />
          </Col>
          <Col span={12}>
            <Statistic title="Total Contributors" value={summary.totalContributors} />
          </Col>
        </Row>
        <Title level={3}>Contributors: </Title>
        <div>
          {
            Objectkeys(contributors).map(name => (
              <Tag key={name}>{`${name} -- ${displayNumber(contributors[name])}`}</Tag>
            ))
          }
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerSummary }, dispatch);
}

function mapStateToProps({ repository }) {
  return {
    summary: repository.summary,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSummary);
