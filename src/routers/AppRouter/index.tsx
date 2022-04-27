import React, { useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ROOT_ROUTES } from '@common/constants/routes';
import { DebtorsView } from '@views/Debtors';
import { LenderDebtorView } from '@views/LenderDebtor';
import { CreateDebtorDebtView } from '@views/CreateDebtorDebt';
import { PayTheDebtOffView } from '@views/PayTheDebtOff';

export const AppRouter: React.FC<
  RouteComponentProps<any, StaticContext, unknown>
> = (props) => {
  const { match } = props;
  const { url, params } = match as { url: string; params: { locale: string } };
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(params.locale);
  }, [params.locale]);

  return (
    <Switch>
      <Route path={`${url}${ROOT_ROUTES.HOME}`} exact>
        <Redirect to={`${url}${ROOT_ROUTES.DEBTORS}`} />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.DEBTORS}`} exact>
        <DebtorsView />
      </Route>

      <Route path={`${url}${ROOT_ROUTES.LENDER_DEBTOR_DEBTS}`} exact>
        <LenderDebtorView />
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
