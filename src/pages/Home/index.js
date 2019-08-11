import React, { PureComponent } from 'react';
import { bool, array } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Skeleton } from 'antd';
import { triggerPlanList } from 'actions/plans';

class Home extends PureComponent {
    static propTypes = {
        listFetching: bool,
        collection: array,
    };

    componentDidMount() {
        this.props.triggerPlanList();
    }
    render() {
        const { plans: { listFetching, collection } } = this.props;

        return (
            <Skeleton loading={listFetching} active avatar>
                { collection.map(item => <Card key={item._id}>{item.title}</Card>) }
            </Skeleton>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ triggerPlanList }, dispatch);
}
  
function mapStateToProps({ plans }) {
    return {
        plans,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
