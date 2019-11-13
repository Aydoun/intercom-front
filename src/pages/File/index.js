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
    const { user: { email, name: username } } = this.props;

    this.props.addCommit({
      username,
      email,
      repoName,
      message: 'random message',
      branch: 'master'
    });
  }

  render() {
    const { fileContent } = this.props;
    const { content } = this.state;

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

function mapStateToProps({ repository: { fileContent }, user: { collection } }) {
  return {
    fileContent,
    user: collection,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileContent);
