import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ROOT_ROUTES } from '@common/constants/routes';
import { DebtorsView } from '@views/Debtors';

// import { HomeView } from '../views/Home';

export const RootRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path={ROOT_ROUTES.HOME} exact>
        <Redirect to={ROOT_ROUTES.DEBTORS} />
        {/* <HomeView /> */}
      </Route>

      <Route path={ROOT_ROUTES.DEBTORS} exact>
        <DebtorsView />
      </Route>
    </Switch>
  </BrowserRouter>
);
