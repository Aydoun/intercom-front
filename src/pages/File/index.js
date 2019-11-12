import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { triggerFileRead } from 'actions/repository';

class FileContent extends PureComponent {
  static propTypes = {
  }

  componentDidMount() {
    const { match: { params: { id, reponame } }, location: { search } } = this.props;

    this.props.triggerFileRead({
      ...queryString.parse(search),
      id,
      reponame,
    })
  }

  render() {
    const { fileContent } = this.props;

    return (
      <div>
        <ul>
          { fileContent.map((item, index) => <li key={index}>{item}</li>) }
        </ul>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ triggerFileRead }, dispatch);
}

function mapStateToProps({ repository: { fileContent } }) {
  return {
    fileContent,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileContent);
