import React, { PureComponent } from 'react';
import { object, array } from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Descriptions, Badge, Divider, Upload, Tabs } from 'antd';
import PlanHistory from './components/PlanHistory';
import { readableDate } from 'utils';

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
        <div className="plans__overview">
          <Upload className="plans__avatar-uploader">
            <Avatar size={128} src={plan.avatar} icon="project" />
          </Upload>
          <Descriptions title={`Plan: ${plan.title}`} bordered className="plans__details">
            <Descriptions.Item label="Title">{plan.title}</Descriptions.Item>
            <Descriptions.Item label="Description">{plan.description}</Descriptions.Item>
            <Descriptions.Item label="Created at">{readableDate(plan.createdAt)}</Descriptions.Item>
            <Descriptions.Item label="Last Update">
              {readableDate(plan.updatedAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge status="success" text={plan.status} />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Divider />
        <Tabs onChange={() => {}} type="card">
          <TabPane tab="Files" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="History" key="2">
            <PlanHistory />
          </TabPane>
          <TabPane tab="Contributors" key="3">
            Content of Tab Pane 3
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
