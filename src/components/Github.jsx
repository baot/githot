import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Github extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };

    this.onSearch = this.onSearch.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
  }

  onSearch({ currentTarget }) { this.setState({ searchTerm: currentTarget.value }); }

  clickSearch() { console.log(this.state.searchTerm); }

  render() {
    return (
      <div className="wrapper">
        <div>
          <TextField type="text" onChange={this.onSearch} />
        </div>
        <div>
          <RaisedButton onClick={this.clickSearch}>Search</RaisedButton>
        </div>
        <div id="results" />
      </div>
    );
  }
}

export default Github;
