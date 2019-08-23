import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { object, bool } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { triggerFiles } from 'actions/repository';
import { Table, Tag, Divider, Icon } from 'antd';
import { readableDate } from 'utils';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Fragment>
        <Icon 
          type={`${record.isDirectory ? 'folder' :  'file-text'}`} 
          theme={`${record.isDirectory ? 'filled' : ''}`} 
        />&nbsp;&nbsp;
        <Link to="/">{text}</Link>
      </Fragment>
    ),
  },
  {
    title: 'Last Modified',
    key: 'timestamp',
    dataIndex: 'date',
    render: date => (
      <Tag color="geekblue">
        { readableDate(date) }
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Icon type="edit" />
        <Divider type="vertical" />
        <Icon type="delete" />
      </span>
    ),
  },
];

class PlanFiles extends PureComponent {
  static propTypes = {
    plan: object,
    fetching: bool,
  };

  componentDidMount() {
    const { plan } = this.props;

    const bPlab = Object.keys(plan).length > 0 ? plan : { repoName: 'c6975c80-c19f-11e9-9875-5ded6f48e86c' };
    this.props.triggerFiles({ repoName: bPlab.repoName });
  }

  render() {
    const { repoFiles, fetching } = this.props;

    return (
      <div className="plans__files">
        <Table 
          columns={columns} 
          dataSource={repoFiles.sort((a, b) => b.isDirectory - a.isDirectory)} 
          loading={fetching}  
          size="middle"
          pagination={false}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerFiles }, dispatch);
}

function mapStateToProps({ repository }) {
  return {
    repoFiles: repository.files,
    fetching: repository.fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanFiles);
