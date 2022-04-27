import { connect } from 'react-redux';

import { Dispatch } from 'redux';

import { LenderDebtorDebtsList } from '@components/LenderDebtor/LenderDebtorDebtsList';
import { selectLenderDebtorDebts } from '@ducks/lenderDebtor/lenderDebtor.selectors';
import {
  getLenderDebtorDebtsSlice,
  getLenderDebtorMapKey,
} from '@ducks/lenderDebtor/lenderDebtor.slice';
import { RootState } from '@store';
import { ApiListParams } from '@common/types/api';

export interface OwnProps {
  lenderId: number;
  debtorId: number;
}

const mapStateToProps = (state: RootState, { lenderId, debtorId }: OwnProps) =>
  selectLenderDebtorDebts(state, getLenderDebtorMapKey(lenderId, debtorId)) ||
  {};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { debtorId, lenderId }: OwnProps
) => ({
  getData: (params: ApiListParams) =>
    dispatch(
      getLenderDebtorDebtsSlice.actions.request({
        debtorId,
        lenderId,
        ...params,
      })
    ),
  resetData: () =>
    dispatch(getLenderDebtorDebtsSlice.actions.reset({ debtorId, lenderId })),
});

export const LenderDebtorDebtsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LenderDebtorDebtsList);
