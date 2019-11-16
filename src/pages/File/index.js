import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Input, Button } from 'antd';
import { triggerFileRead, writeFileContent, addCommit } from 'actions/repository';

class FileContent extends PureComponent {
  static propTypes = {
  }

  state = {
    content: '',
  }

  componentDidMount() {
    const { match: { params: { id, repoName } }, location: { search } } = this.props;

    this.props.triggerFileRead({
      ...queryString.parse(search),
      id,
      repoName,
    })
  }

  writeToFile = () => {
    const { match: { params: { id, repoName } }, location: { search } } = this.props;
    const { content } = this.state;
    if (content) {
      this.props.writeFileContent({ 
        ...queryString.parse(search),
        id,
        repoName,
        content,
       });
    }
  }

  registerCommit = () => {
    const { match: { params: { repoName } } } = this.props;
    const { user: { email, name: username }, currentBranch } = this.props;

    this.props.addCommit({
      username,
      email,
      repoName,
      message: Math.random().toString(36).substring(2, 15),
      branch: currentBranch,
    });
  }

  render() {
    const { fileContent } = this.props;
    const content = this.state.content || fileContent.join(',');

    return (
      <div>
        <Input  
          value={content} 
          onChange={e => this.setState({ content: e.target.value })}
        />
        <Button
          type="primary"
          icon="save"
          onClick={this.writeToFile}
        >
          Save
        </Button>
        <Button
          type="primary"
          icon="save"
          onClick={this.registerCommit}
        >
          commit
        </Button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerFileRead, writeFileContent, addCommit }, dispatch);
}

function mapStateToProps({ repository: { fileContent, currentBranch }, user: { collection } }) {
  return {
    fileContent,
    user: collection,
    currentBranch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileContent);
