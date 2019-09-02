import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Timeline, Tag, Icon, Button, Empty, Modal } from 'antd';
import { triggerIssuesList } from 'actions/plans';
import Card from 'components/Card';
import { readableDate } from 'utils';

class PlanIssues extends PureComponent {
  state = {
    modalOpened: false,
  }

  componentDidMount() {
    const { triggerIssuesList, plan } = this.props;
    
    if (plan) {
      triggerIssuesList({ id: plan._id });
    }
  }

  hideModal = () => {
    this.setState({ modalOpened: false });
  }

  openIssueModalForm = () => {
    this.setState({ modalOpened: true });
  }

  saveIssue = () => {
    console.log('lets save it!');
  }

  render() {
    const { issues } = this.props;
    return (
      <div className="plans__issues">
        <div className="plans__issues-create">
          <Button icon="plus" type="primary" onClick={this.openIssueModalForm}>Add issue</Button>
        </div>
        {
          issues.length > 0 ? (
            <Timeline>
              {
                issues.map(item => (
                  <Timeline.Item key={item._id} >
                    <Link to={`/issue/${item.id}`}>
                      <Card
                        icon={<Icon type="warning" style={{ color: '#faad14' }} />}
                        text={item.title}
                        extra={<Tag color="geekblue">{readableDate(item.createdAt)}</Tag>}
                      />
                    </Link>
                  </Timeline.Item>
                ))
              }
            </Timeline>
          ) : (
            <Empty />
          )
        }
        <Modal
          title="Basic Modal"
          visible={this.state.modalOpened}
          onOk={this.saveIssue}
          onCancel={this.hideModal}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerIssuesList }, dispatch);
}

function mapStateToProps({ plans }) {
  return {
    issues: plans.issues,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanIssues);
