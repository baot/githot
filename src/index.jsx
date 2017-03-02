import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import App from './components/App';
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

// todo: dry
render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  app
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;  // eslint-disable-line
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      app
    );
  });
}
