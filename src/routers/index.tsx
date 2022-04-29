import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AppRouter } from './AppRouter';

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:locale">
          <AppRouter />
        </Route>

        <Route>
          <Redirect to="/en" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
