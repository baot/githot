import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Github from './Github';
import '../styles/index.scss';

const muiTheme = getMuiTheme({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };

    this.showError.bind(this);
  }

  showError(s) { this.setState({ error: s }); }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Githot"
            showMenuIconButton={false}
          />
          { this.state.error ? <h3>{ this.state.error }</h3> : null }
          <Github showError={this.showError} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
