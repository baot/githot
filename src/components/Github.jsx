import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

// import { ghTrendSearch } from '../lib';
import { fetchHotGhRepos, resetHotGhRepos } from '../actions';
import ReposTable from './ReposTable';

class Github extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };

    this.onSearch = this.onSearch.bind(this);
    this.showError = this.showError.bind(this);
  }

  onSearch({ currentTarget }) {
    this.setState({ searchTerm: currentTarget.value});
    if (this.props.repos.length != 0 || this.props.error != null) {
      this.props.resetRepos();
    }  
  }

  showError(s) { this.setState({ error: s }); }

  render() {
    const { repos, clickSearch, error } = this.props;
    return (
      <div className="wrapper">
        <div>
          <h2>Hot Github Repos</h2>
        </div>
        <div>
          <TextField type="text" floatingLabelText="Language" onChange={this.onSearch} />
        </div>
        <div>
          <RaisedButton onClick={clickSearch.bind(null, this.state.searchTerm)}>Search</RaisedButton>
        </div>
        { error ? <div className="error">{ error }</div> : null }
        <ReposTable repos={repos} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repos: state.hotGhRepos.repos,
    error: state.hotGhRepos.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickSearch: (language) => {
      dispatch(fetchHotGhRepos(language));
    },
    resetRepos: () => {
      dispatch(resetHotGhRepos());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Github);
