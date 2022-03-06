import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ROOT_ROUTES } from '@common/constants/routes';
import { DebtorsView } from '@views/Debtors';

import { HomeView } from '../views/Home';

export const RootRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path={ROOT_ROUTES.HOME}>
        <HomeView />
      </Route>

      <Route path={ROOT_ROUTES.DEBTORS}>
        <DebtorsView />
      </Route>
    </Switch>
  </BrowserRouter>
);
