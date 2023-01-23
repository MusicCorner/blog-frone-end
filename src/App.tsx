import React from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/material';

import { sagaMiddleware } from '@common/store/middlewares';
import { sagas } from '@store/sagas';
import { theme } from '@common/mui/theme';

import { RootRouter } from './routers';
import { store } from './store';

sagaMiddleware.run(sagas);

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootRouter />
      </ThemeProvider>
    </Provider>
  );
};
