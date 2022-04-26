import { connect } from 'react-redux';

import { DebtorsList } from '@components/Debtor/DebtorsList';
import {
  selectDebtorsListIds,
  selectGetDebtorsIsProcessing,
} from '@ducks/debtors/debtors.selectors';
import { getDebtorsSlice } from '@ducks/debtors/debtors.slice';
import { RootState } from '@store';

const mapStateToProps = (state: RootState) => ({
  ids: selectDebtorsListIds(state),
  isProcessing: selectGetDebtorsIsProcessing(state),
});

const mapDispatchToProps = {
  getData: getDebtorsSlice.actions.request,
};

export const DebtorsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtorsList);
