import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { object, bool, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { triggerFiles, triggerBranchList, triggerStatus } from 'actions/repository';
import { triggerFileAddition, triggerFileDeletion } from 'actions/plans';
import {
  Table,
  Tag,
  Divider,
  Icon,
  Button,
  Menu,
  Dropdown,
  Popover,
  Input,
  Popconfirm,
} from 'antd';
import { readableDate } from 'utils';

const columns = (deleteFunction, currentPlan) => [
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
        <Link 
          to={`/plan/${currentPlan._id}/${currentPlan.repoName}?fileName=${text}&sha=${record.commitsha || ''}`}>
          {text}
        </Link>
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
      <Fragment>
        <Link to="/"><Icon type="edit" /></Link>
        <Divider type="vertical" />
        <Popconfirm
          title="Please confirm your choice"
          onConfirm={deleteFunction(record.name)}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Icon
            type="delete"
            className="global--red"
          />
        </Popconfirm>
      </Fragment>
    ),
  },
];

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
    draftName: '',
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

    return (<Menu>{branchList.map(branch => <Menu.Item key={branch}><Icon type="branches" />{branch}</Menu.Item>)}</Menu>);
  }

  addFile = type => async () => {
    const { plan, triggerFileAddition } = this.props;
    const { fileName } = this.state;

    try {
      await triggerFileAddition({ fileName, repoName: plan.repoName, type, dirName: fileName });

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
    } catch(e) {}

  }

  onActionSelected = ({ key }) => {
    const numberKey = Number(key);
    const { plan } = this.props;

    switch (numberKey) {
      case 2:
        this.props.triggerStatus({ repoName: plan.repoName });
        break;
      default:
        break;
    }
  };

  get actionMenu() {
    return (
      <Menu onClick={this.onActionSelected}>
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
  }

  deleteFile = fileName => () => {
    const { plan, triggerFileDeletion } = this.props;

    triggerFileDeletion({ repoName: plan.repoName, fileName })
  }

  savefileName = e => this.setState({ fileName: e.target.value });
  saveDraftName = e => this.setState({ draftName: e.target.value });

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

  createDraft = () => {
    const { draftName } = this.state;
    if (draftName) {
      console.log(draftName, 22)
    }
  }

  render() {
    const { repoFiles, fetching, plan } = this.props;
    const allFiles = repoFiles.concat(this.state.extraFiles);

    return (
      <div className="plans__files">
        <div className="plans__files-menu">
          <Dropdown overlay={this.makeBranchList} trigger={['click']}>
            <Button icon="branches">
              Drafts <Icon type="down" />
            </Button>
          </Dropdown>
          <Popover
            content={<div>
              <Input 
                placeholder="choose a name" 
                value={this.state.draftName}
                onChange={this.saveDraftName}
              />
              <Button type="primary" icon="save" onClick={this.createDraft}>Save</Button>
            </div>}
            trigger="click"
            placement="bottom"
          >
            <Button icon="plus" />
          </Popover>
          
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
          columns={columns(this.deleteFile, plan)}
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
  return bindActionCreators({
    triggerFiles,
    triggerBranchList,
    triggerFileAddition,
    triggerFileDeletion,
    triggerStatus,
  }, dispatch);
}

function mapStateToProps({ repository: { files, fetching, branchList } }) {
  return {
    repoFiles: files,
    fetching,
    branchList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanFiles);
