import React, { PureComponent } from 'react';
import { array } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Divider, Tabs, Icon } from 'antd';
import { triggerUpdatePlan } from 'actions/plans';
import { notify } from 'actions/index';
import PlanFiles from './components/PlanFiles';
import PlanHistory from './components/PlanHistory';
import PlanDetails from './components/PlanDetails';

const { TabPane } = Tabs;

class Plan extends PureComponent {
  static propTypes = {
    plans: array,
  };

  componentDidMount() {
    const { plans, history } = this.props;

    if (plans.length === 0) history.push("/");
  }

  selectPlanById = id => {
    const { plans } = this.props;
    return plans.find(item => item._id === id) || {};
  }

  render() {
    const { triggerUpdatePlan, notify, match: { params: { id } } } = this.props;
    const plan = this.selectPlanById(id);

    return (
      <div className="plans">
        <PlanDetails plan={plan} notify={notify} updatePlan={triggerUpdatePlan} />
        <Divider />
        <Tabs onChange={() => { }} type="card">
          <TabPane tab={<span><Icon type="file" /> Files</span>} key="1">
            <PlanFiles plan={plan} />
          </TabPane>
          <TabPane tab={<span><Icon type="history" /> History</span>} key="2">
            <PlanHistory plan={plan} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ notify, triggerUpdatePlan }, dispatch);
}

function mapStateToProps({ user, plans }) {
  return {
    user,
    plans: plans.collection,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
