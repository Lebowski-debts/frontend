import { connect } from 'react-redux';
import React from 'react';

import { DebtorsListItem, Props } from '@widgets/Debtor/DebtorsListItem';
import { selectDebtorDebtsInfo } from '@ducks/debtors/debtors.selectors';
import { selectUser } from '@ducks/users/users.selector';
import { RootState } from '@store';

const mapStateToProps = (
  state: RootState,
  { debtorId }: { debtorId: number }
) => ({
  debtsInfo: selectDebtorDebtsInfo(state, debtorId),
  user: selectUser(state, debtorId),
});

export const DebtorsListItemContainer = connect(mapStateToProps)(
  DebtorsListItem as React.FC<Partial<Props>>
);
