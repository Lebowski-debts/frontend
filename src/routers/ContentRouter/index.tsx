import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { ROOT_ROUTES } from '@common/constants/routes';
import { DebtorsView } from '@views/Debtors';
import { DebtorDebtsView } from '@views/DebtorDebts';
import { CreateDebtorDebtView } from '@views/CreateDebtorDebt';
import { PayTheDebtOffView } from '@views/PayTheDebtOff';

export const ContentRouter: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}${ROOT_ROUTES.HOME}`} exact>
        <Redirect to={`${url}${ROOT_ROUTES.DEBTORS}`} />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.DEBTORS}`} exact>
        <DebtorsView />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.DEBTOR_DEBTS}`} exact>
        <DebtorDebtsView />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.CREATE_DEBTOR_DEBT}`} exact>
        <CreateDebtorDebtView />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.PAY_THE_DEBT_OFF}`} exact>
        <PayTheDebtOffView />
      </Route>
    </Switch>
  );
};
