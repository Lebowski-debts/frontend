import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { ROOT_ROUTES } from '@common/constants/routes';
import { LenderDebtorDebtsView } from '@views/LenderDebtorDebtsView';
import { CreateDebtorDebtView } from '@views/CreateDebtorDebt';
import { PayTheDebtOffView } from '@views/PayTheDebtOff';
import { DebtorsListContainer } from '@containers/Debtors/DebtorsListContainer';
import { LendersListContainer } from '@containers/Lenders/LendersListContainer';

export const ContentRouter: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}${ROOT_ROUTES.HOME}`} exact>
        <Redirect to={`${url}${ROOT_ROUTES.DEBTORS}`} />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.DEBTORS}`} exact>
        <DebtorsListContainer />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.LENDERS}`} exact>
        <LendersListContainer />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.LENDER_DEBTOR_DEBTS}`} exact>
        <LenderDebtorDebtsView />
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
