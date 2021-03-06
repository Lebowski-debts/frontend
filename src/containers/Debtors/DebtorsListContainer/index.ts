import { connect } from 'react-redux';

import { DebtorsList } from '@widgets/Debtor/DebtorsList';
import { selectGetDebtors } from '@ducks/debtors/debtors.selectors';
import { getDebtorsSlice } from '@ducks/debtors/debtors.slice';
import { RootState } from '@store';

import { DebtorsListItemContainer } from '../DebtorsListItemContainer';

const mapStateToProps = (state: RootState) => ({
  ...selectGetDebtors(state),
  DebtorsListItemContainer,
});

const mapDispatchToProps = {
  getData: getDebtorsSlice.actions.request,
  resetData: getDebtorsSlice.actions.reset,
};

export const DebtorsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtorsList);
