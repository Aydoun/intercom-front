import React, { PureComponent } from 'react';
import { object, array } from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Descriptions, Badge, Divider, Upload, Tabs } from 'antd';
import { readableDate } from 'utils';

class PlanHistory extends PureComponent {
  static propTypes = {
  };

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="plans">
        <div className="plans__history">
          <span>I'm History</span>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanHistory);
