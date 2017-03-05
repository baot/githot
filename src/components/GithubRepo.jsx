import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import { fetchHotGhRepos, resetHotGhRepos } from '../actions';
import ReposTable from './ReposTable';

class GithubRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' , repoCreatedDate: null };

    // todo: redux flow
    this.onSearch = this.onSearch.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }

  onSearch({ currentTarget }) {
    this.setState({ searchTerm: currentTarget.value});
    if (this.props.repos.length != 0 || this.props.error != null) {
      this.props.resetRepos();
    }  
  }

  dateChange(event, date) {
    this.setState({ repoCreatedDate: date });
  }

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
          <DatePicker 
            hintText="Repos created from date" 
            value={this.state.repoCreatedDate}
            onChange={this.dateChange}
          />
        </div>
        <div>
          <RaisedButton onClick={clickSearch.bind(null, this.state)}>Search</RaisedButton>
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
    clickSearch: ({searchTerm, repoCreatedDate}) => {
      dispatch(fetchHotGhRepos({
        created: repoCreatedDate,
        language: searchTerm,
      }));
    },
    resetRepos: () => {
      dispatch(resetHotGhRepos());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GithubRepo);
