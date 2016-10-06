import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

const app = document.getElementById('app');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  app
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;  // eslint-disable-line
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      app
    );
  });
}
