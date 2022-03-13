import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { sagaMiddleware } from '@common/store/middlewares';
import { sagas } from '@store/sagas';
import i18n from '@common/translate';

import { RootRouter } from './routers';
import { store } from './store';

sagaMiddleware.run(sagas);

const theme = createTheme({
  spacing: (value: number | string) => value,
  palette: {
    mode: 'dark',
    background: {
      // light: '#38608C',
      // main: '#1D3958',
      // dark: '#0D1C2D',
      default: '#1D3958',
      paper: '#38608C',
    },
  },
});

export const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RootRouter />
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
};
