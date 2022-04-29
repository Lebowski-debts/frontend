import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { ROOT_ROUTES } from '@common/constants/routes';
import { DebtorDebtsHeader } from '@widgets/Headers/DebtorDebtsHeader';

export const HeaderRouter: React.FC = () => {
  const { url: locale } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${locale}${ROOT_ROUTES.DEBTOR_DEBTS}`}>
        <DebtorDebtsHeader />
      </Route>
    </Switch>
  );
};
