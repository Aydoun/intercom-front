import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class PlanFiles extends PureComponent {
  static propTypes = {
  };

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="plans">
        <div className="plans__history">
          <span>I'm Files</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanFiles);
