import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Github from './Github';
import '../styles/index.scss';

const muiTheme = getMuiTheme({});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar
        title="Githot"
        showMenuIconButton={false}
      />
      <Github />
    </div>
  </MuiThemeProvider>
);

export default App;
