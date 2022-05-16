import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROOT_ROUTES } from '@common/constants/routes';
import { DebtorDebtsHeader } from '@widgets/Headers/DebtorDebtsHeader';
import { CreateDebtorDebtHeader } from '@widgets/Headers/CreateDebtorDebtHeader';
import { PayTheDebtOffHeader } from '@widgets/Headers/PayTheDebtOffHeader';
import { MainSideBar } from '@widgets/SideBars/Main';
import { HeaderWithSideBar } from '@widgets/Headers/HeaderWithSideBar';

export const HeaderRouter: React.FC = () => {
  const { url: locale } = useRouteMatch();
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <MainSideBar
        open={isSidebarOpened}
        onClose={() => setIsSidebarOpened(false)}
      />

      <Switch>
        <Route path={`${locale}${ROOT_ROUTES.DEBTORS}`} exact>
          <HeaderWithSideBar
            title={t('navigation.debtors')}
            setIsSidebarOpened={setIsSidebarOpened}
          />
        </Route>

        <Route path={`${locale}${ROOT_ROUTES.LENDERS}`} exact>
          <HeaderWithSideBar
            title={t('navigation.lenders')}
            setIsSidebarOpened={setIsSidebarOpened}
          />
        </Route>

        <Route path={`${locale}${ROOT_ROUTES.SETTINGS}`} exact>
          <HeaderWithSideBar
            title={t('navigation.settings')}
            setIsSidebarOpened={setIsSidebarOpened}
          />
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
    </>
  );
};
