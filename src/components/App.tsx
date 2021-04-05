import React, { Suspense } from 'react';
import { StylesProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { defaultTheme } from '../theme/theme';
import Exchange from './exchange/Exchange';
import store from '../store/store';

const App = () => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <Suspense fallback='loading'>
          <Exchange />
        </Suspense>
      </Provider>
    </ThemeProvider>
  </StylesProvider>
);

export default App;
