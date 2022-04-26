import { connect } from 'react-redux';

import { LenderDebtorDebtsListItem } from '@components/LenderDebtor/LenderDebtorDebtsListItem';
import { selectDebtById } from '@ducks/debts/debts.selectors';
import { RootState } from '@store';

const mapStateToProps = (state: RootState, { debtId }: { debtId: number }) =>
  selectDebtById(state, debtId) || {};

export const LenderDebtorDebtsListItemContainer = connect(mapStateToProps)(
  LenderDebtorDebtsListItem
);
