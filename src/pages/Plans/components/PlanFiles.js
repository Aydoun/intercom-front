import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { object, bool } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { triggerFiles } from 'actions/repository';
import { Table, Tag, Divider, Icon, Button, Menu, Dropdown } from 'antd';
import { readableDate } from 'utils';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
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
    sorter: (a, b) => new Date(b) - new Date(a),
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

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="save"/>
      Save Changes
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="monitor"/>
      Preview
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="pull-request"/>
      Merge
    </Menu.Item>
    <Menu.Item key="4">
      <Icon type="fork"/>
      Add Draft
    </Menu.Item>
  </Menu>
);

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
        <div className="plans__files-menu">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon="branches">
              Drafts <Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon="build">
              Actions <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <div className="plans__files-edit">
          <Button icon="file-add">Add file</Button>&nbsp;&nbsp;
          <Button icon="folder-add">Add folder</Button>
        </div>
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
