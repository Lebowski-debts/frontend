import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { LicenseInfo } from '@mui/x-license-pro';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { sagaMiddleware } from '@common/store/middlewares';
import { sagas } from '@store/sagas';
import i18n from '@common/translate';

import { RootRouter } from './routers';
import { store } from './store';
import './index.scss';

LicenseInfo.setLicenseKey('');
sagaMiddleware.run(sagas);

const theme = createTheme({
  spacing: (value: number | string) => value,
  palette: {
    mode: 'dark',
    background: {
      default: '#0D1C2D',
      paper: '#1D3958',
    },

    primary: {
      main: '#38608C',
      contrastText: '#ffff',
    },

    secondary: {
      main: '#90CAF9',
      contrastText: '#000',
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        // select: {
        //   ':'
        //   borderColor: 'white',
        // },
      },
    },
  },
});

export const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeProvider theme={theme} key="app">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <RootRouter />
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
};
