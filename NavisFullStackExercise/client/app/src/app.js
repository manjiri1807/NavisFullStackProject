import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import ErrorHandler from '@app/components/ErrorHandler';
import MainLayout from '@app/layouts/MainLayout';
import theme from '@app/styles/mui-theme';
import store from '@app/modules/store';

function renderApp() {
  ReactDOM.render(
    <ErrorHandler>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <MainLayout />
        </Provider>
      </MuiThemeProvider>
    </ErrorHandler>,
    document.getElementById('app')
  );
}

renderApp();
