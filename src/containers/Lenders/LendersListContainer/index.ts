import { connect } from 'react-redux';

import { DebtorsList } from '@widgets/Debtor/DebtorsList';
import { RootState } from '@store';
import { getLendersSlice } from '@ducks/lenders/lenders.slice';
import { selectGetLenders } from '@ducks/lenders/lenders.selectors';

import { LendersListItemContainer } from '../LendersListItemContainer';

const mapStateToProps = (state: RootState) => ({
  ...selectGetLenders(state),
  DebtorsListItemContainer: LendersListItemContainer,
});

const mapDispatchToProps = {
  getData: getLendersSlice.actions.request,
  resetData: getLendersSlice.actions.reset,
};

export const LendersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtorsList);
