import { connect } from 'react-redux';

import { selectDebtById } from '@ducks/debts/debts.selectors';
import { RootState } from '@store';
import { DebtsListItem } from '@widgets/Debts/DebtsListItem';

const mapStateToProps = (state: RootState, { debtId }: { debtId: number }) =>
  selectDebtById(state, debtId) || {};

export const DebtsListItemContainer = connect(mapStateToProps)(DebtsListItem);
