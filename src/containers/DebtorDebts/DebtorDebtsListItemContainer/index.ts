import { connect } from 'react-redux';

import { DebtorDebtsListItem } from '@widgets/DebtorDebts/DebtorDebtsListItem';
import { selectDebtById } from '@ducks/debts/debts.selectors';
import { RootState } from '@store';

const mapStateToProps = (state: RootState, { debtId }: { debtId: number }) =>
  selectDebtById(state, debtId) || {};

export const DebtorDebtsListItemContainer =
  connect(mapStateToProps)(DebtorDebtsListItem);
