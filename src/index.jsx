import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { Router, Route, Link, browserHistory } from 'react-router';

import App from './components/App';
import GithubRepo from './components/GithubRepo';
import rootReducer from './reducers';

const loggerMiddleware = logger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

// https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away
injectTapEventPlugin();

const app = document.getElementById('app');

const muiTheme = getMuiTheme({});

const RouterComponent = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <Route path="repo" component={GithubRepo} />
        <Route path="user" component={GithubUser}
      </Route>
    </Router>
  </MuiThemeProvider>
);

// todo: dry
render(
  <AppContainer>
    <Provider store={store}>
      <RouterComponent />
    </Provider>
  </AppContainer>,
  app
);

if (module.hot) {
  module.hot.accept(RouterComponent, () => {
    //const NextApp = require('./components/App').default;  // eslint-disable-line
    render(
      <AppContainer>
        <Provider store={store}>
          <RouterComponent />
        </Provider>
      </AppContainer>,
      app
    );
  });
}
