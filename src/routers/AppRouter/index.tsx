import React, { useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ROOT_ROUTES } from '@common/constants/routes';
import { DebtorsView } from '@views/Debtors';

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
        {/* <HomeView /> */}
      </Route>

      <Route path={`${url}${ROOT_ROUTES.DEBTORS}`} exact>
        <DebtorsView />
      </Route>
    </Switch>
  );
};