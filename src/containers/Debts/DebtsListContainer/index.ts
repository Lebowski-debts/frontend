import { connect } from 'react-redux';

import { Dispatch } from 'redux';

import { DebtsList } from '@widgets/Debts/DebtsList';
import { RootState } from '@store';
import { ApiListParams } from '@common/types/api';
import { LenderDebtorActionProps } from '@ducks/lenderDebtor/lenderDebtor.types';
import { selectGetLenderDebtorDebts } from '@ducks/lenderDebtor/lenderDebtor.selectors';
import {
  getLenderDebtorDebtsSlice,
  getLenderDebtorMapKey,
} from '@ducks/lenderDebtor/lenderDebtor.slice';

const mapStateToProps = (
  state: RootState,
  { lenderId, debtorId }: LenderDebtorActionProps
) =>
  selectGetLenderDebtorDebts(
    state,
    getLenderDebtorMapKey(lenderId, debtorId)
  ) || {};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { lenderId, debtorId }: LenderDebtorActionProps
) => ({
  getData: (params: ApiListParams) =>
    dispatch(
      getLenderDebtorDebtsSlice.actions.request({
        lenderId,
        debtorId,
        ...params,
      })
    ),
  resetData: () =>
    dispatch(getLenderDebtorDebtsSlice.actions.reset({ lenderId, debtorId })),
});

export const DebtsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtsList);
