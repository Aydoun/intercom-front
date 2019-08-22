import React, { PureComponent } from 'react';
import { array } from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Tabs } from 'antd';
import PlanFiles from './components/PlanFiles';
import PlanHistory from './components/PlanHistory';
import PlanContributors from './components/PlanContributors';
import PlanSummary from './components/PlanSummary';

const { TabPane } = Tabs;

class Plan extends PureComponent {
  static propTypes = {
    plans: array,
  };


  componentDidMount() {
    const { plans: { collection } } = this.props;

    if (collection.length === 0) {
      // this.props.history.push("/");
    }
  }

  selectPlanById = id => {
    const { collection } = this.props.plans;

    return collection.find(item => item._id === id) || {};
  }

  render() {
    const { id } = this.props.match.params;
    const plan = this.selectPlanById(id);

    return (
      <div className="plans">
        <PlanSummary plan={plan} />
        <Divider />
        <Tabs onChange={() => {}} type="card">
          <TabPane tab="Files" key="1">
            <PlanFiles />
          </TabPane>
          <TabPane tab="History" key="2">
            <PlanHistory />
          </TabPane>
          <TabPane tab="Contributors" key="3">
            <PlanContributors />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps({ user, plans }) {
  return {
    user,
    plans,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
