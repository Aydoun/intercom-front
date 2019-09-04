import React, { PureComponent } from 'react';
import { array } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Divider, Tabs, Icon } from 'antd';
import { showError } from 'actions/index';

import PlanFiles from './components/PlanFiles';
import PlanHistory from './components/PlanHistory';
import PlanSummary from './components/PlanSummary';
import PlanDetails from './components/PlanDetails';
import PlanIssues from './components/Issues';

const { TabPane } = Tabs;

class Plan extends PureComponent {
  static propTypes = {
    plans: array,
  };

  componentDidMount() {
    const { plans } = this.props;

    if (plans.length === 0) {
      this.props.history.push("/");
    }
  }

  selectPlanById = id => {
    const { plans } = this.props;
    return plans.find(item => item._id === id) || {};
  }

  render() {
    const { id } = this.props.match.params;
    const plan = this.selectPlanById(id);

    return (
      <div className="plans">
        <PlanDetails plan={plan} showError={this.props.showError} />
        <Divider />
        <Tabs onChange={() => { }} type="card">
          <TabPane tab={<span><Icon type="file" /> Files</span>} key="1">
            <PlanFiles plan={plan} />
          </TabPane>
          <TabPane tab={<span><Icon type="history" /> History</span>} key="2">
            <PlanHistory plan={plan} />
          </TabPane>
          <TabPane tab={<span><Icon type="issues-close" /> Issues</span>} key="3">
            <PlanIssues plan={plan} />
          </TabPane>
          <TabPane tab={<span><Icon type="user" /> Contributors</span>} key="4">
            <PlanSummary plan={plan} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showError }, dispatch);
}

function mapStateToProps({ user, plans }) {
  return {
    user,
    plans: plans.collection,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
