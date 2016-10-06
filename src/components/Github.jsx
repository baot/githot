import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { ghTrendSearch } from '../lib';

class Github extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', error: '' };

    this.onSearch = this.onSearch.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.showError = this.showError.bind(this);
  }

  onSearch({ currentTarget }) { this.setState({ searchTerm: currentTarget.value, error: '' }); }

  showError(s) { this.setState({ error: s }); }

  clickSearch() {
    ghTrendSearch(this.state.searchTerm).fork(this.showError, console.log);
  }

  render() {
    return (
      <div className="wrapper">
        <div>
          <h2>Hot Github Repos</h2>
        </div>
        <div>
          <TextField type="text" floatingLabelText="Language" onChange={this.onSearch} />
        </div>
        <div>
          <RaisedButton onClick={this.clickSearch}>Search</RaisedButton>
        </div>
        { this.state.error ? <div className="error">{ this.state.error }</div> : null }
        <div id="results" />
      </div>
    );
  }
}

export default Github;
