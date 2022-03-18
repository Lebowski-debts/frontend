import { connect } from 'react-redux';
import React from 'react';

import { DebtorsListItem } from '@components/Debtors/DebtorsListItem';
import { selectDebtorDebtsInfo } from '@ducks/debtors/debtors.selectors';
import { selectUser } from '@ducks/users/users.selector';
import { RootState } from '@store';
import { ApiGetDebtor } from '@common/types/api/debtor';

const mapStateToProps = (state: RootState, { userId }: { userId: number }) => ({
  debtsInfo: selectDebtorDebtsInfo(state, userId),
  user: selectUser(state, userId),
});

export const DebtorsListItemContainer = connect(mapStateToProps)(
  DebtorsListItem as React.FC<Partial<ApiGetDebtor>>
);
