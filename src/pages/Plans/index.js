import React, { PureComponent } from 'react';
import { array } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import { triggerUpdatePlan } from 'actions/plans';
import { notify } from 'actions/index';
import PlanFiles from './components/PlanFiles';
import PlanDetails from './components/PlanDetails';

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
        <PlanFiles plan={plan} />
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
