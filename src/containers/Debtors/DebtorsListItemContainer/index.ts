import { connect } from 'react-redux';
import React from 'react';

import { DebtorsListItem, Props } from '@widgets/Debtor/DebtorsListItem';
import { selectDebtorDebtsInfo } from '@ducks/debtors/debtors.selectors';
import { selectUser } from '@ducks/users/users.selector';
import { RootState } from '@store';
import { ROOT_ROUTES } from '@common/constants/routes';

const mapStateToProps = (state: RootState, { userId }: { userId: number }) => ({
  debtsInfo: selectDebtorDebtsInfo(state, userId),
  user: selectUser(state, userId),
  getDebtsRoute: () =>
    ROOT_ROUTES.getLenderDebtorDebtsRoute(
      +(process.env.TELEGRAM_USER_ID || 0),
      userId
    ),
});

export const DebtorsListItemContainer = connect(mapStateToProps)(
  DebtorsListItem as React.FC<Partial<Props>>
);
