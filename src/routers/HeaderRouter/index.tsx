import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { ROOT_ROUTES } from '@common/constants/routes';
import { DebtorDebtsHeader } from '@widgets/Headers/DebtorDebtsHeader';
import { CreateDebtorDebtHeader } from '@widgets/Headers/CreateDebtorDebtHeader';
import { PayTheDebtOffHeader } from '@widgets/Headers/PayTheDebtOffHeader';
import { DebtorsHeader } from '@widgets/Headers/DebtorsHeader';

export const HeaderRouter: React.FC = () => {
  const { url: locale } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${locale}${ROOT_ROUTES.DEBTORS}`} exact>
        <DebtorsHeader />
      </Route>
      <Route path={`${locale}${ROOT_ROUTES.DEBTOR_DEBTS}`} exact>
        <DebtorDebtsHeader />
      </Route>

      <Route path={`${locale}${ROOT_ROUTES.CREATE_DEBTOR_DEBT}`} exact>
        <CreateDebtorDebtHeader />
      </Route>

      <Route path={`${locale}${ROOT_ROUTES.PAY_THE_DEBT_OFF}`} exact>
        <PayTheDebtOffHeader />
      </Route>
    </Switch>
  );
};
