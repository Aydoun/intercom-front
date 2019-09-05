import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { object, bool, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { triggerFiles, triggerBranchList } from 'actions/repository';
import { triggerFileAddition } from 'actions/plans';
import { Table, Tag, Divider, Icon, Button, Menu, Dropdown, Popover, Input } from 'antd';
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
          type={`${record.isDirectory ? 'folder' : 'file-text'}`}
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
        {readableDate(date)}
      </Tag>
    ),
  },
  {
    title: 'Comment',
    key: 'comment',
    render: date => (
      <span>Comment</span>
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
      <Icon type="save" />
      Save Changes
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="monitor" />
      Preview
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="pull-request" />
      Merge
    </Menu.Item>
    <Menu.Item key="4">
      <Icon type="fork" />
      Add Draft
    </Menu.Item>
  </Menu>
);

class PlanFiles extends PureComponent {
  static propTypes = {
    plan: object,
    fetching: bool,
    triggerFiles: func,
    triggerBranchList: func,
  };

  state = {
    extraFiles: [],
    fileName: '',
  };

  componentDidMount() {
    const { plan, triggerBranchList, triggerFiles } = this.props;

    if (plan.repoName) {
      triggerFiles({ repoName: plan.repoName });
      triggerBranchList({ repoName: plan.repoName });
    }
  }

  get makeBranchList() {
    const { branchList } = this.props;

    return (<Menu>{branchList.map((branch, index) => <Menu.Item key={index}><Icon type="branches" /> {branch}</Menu.Item>)}</Menu>);
  }

  addFile = type => async () => {
    const { plan } = this.props;
    const { fileName } = this.state;

    this.props.triggerFileAddition({ fileName, repoName: plan.repoName, type, dirName: fileName });

    if (fileName) {
      const newFile = {
        isDirectory: type === 'dir',
        isFile: type === 'file',
        key: new Date().getTime(),
        name: fileName,
      };

      this.setState(prevState => {
        return {
          extraFiles: prevState.extraFiles.concat(newFile),
          fileName: '',
        }
      });
    }
  }

  savefileName = e => this.setState({ fileName: e.target.value });

  getFileForm = type => {
    return (
      <div className="plans__files-add">
        <Input
          placeholder="choose a name"
          value={this.state.fileName}
          onChange={this.savefileName}
        />
        <Button
          type="primary"
          icon="save"
          onClick={this.addFile(type)}
          size="small"
          className="plans__files-add-button"
        >
          Confirm
        </Button>
      </div>
    );
  }

  render() {
    const { repoFiles, fetching } = this.props;
    const allFiles = repoFiles.concat(this.state.extraFiles);

    return (
      <div className="plans__files">
        <div className="plans__files-menu">
          <Dropdown overlay={this.makeBranchList} trigger={['click']}>
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
          <Popover
            placement="bottomLeft"
            title={<span><Icon type="plus" /> Add a File</span>}
            content={this.getFileForm('file')}
            trigger="click"
          >
            <Button icon="file-add" >Add file</Button>
          </Popover>
          &nbsp;&nbsp;
          <Popover
            placement="bottomLeft"
            title={<span><Icon type="plus" /> Add a Folder</span>}
            content={this.getFileForm('dir')}
            trigger="click"
          >
            <Button icon="folder-add" >Add folder</Button>
          </Popover>
        </div>
        <Table
          columns={columns}
          dataSource={allFiles.sort((a, b) => b.isDirectory - a.isDirectory)}
          loading={fetching}
          size="middle"
          pagination={false}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerFiles, triggerBranchList, triggerFileAddition }, dispatch);
}

function mapStateToProps({ repository: { files, fetching, branchList } }) {
  return {
    repoFiles: files,
    fetching,
    branchList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanFiles);
