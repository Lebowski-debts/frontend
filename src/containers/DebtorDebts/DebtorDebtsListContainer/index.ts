import { connect } from 'react-redux';

import { Dispatch } from 'redux';

import { DebtorDebtsList } from '@components/DebtorDebts/DebtorDebtsList';
import { RootState } from '@store';
import { ApiListParams } from '@common/types/api';
import { selectDebtorDebts } from '@ducks/debtors/debtors.selectors';
import {
  getDebtorDebtsSlice,
  getLenderDebtorMapKey,
} from '@ducks/debtors/debtors.slice';

export interface OwnProps {
  debtorId: number;
}

const mapStateToProps = (state: RootState, { debtorId }: OwnProps) =>
  selectDebtorDebts(state, getLenderDebtorMapKey(debtorId)) || {};

const mapDispatchToProps = (dispatch: Dispatch, { debtorId }: OwnProps) => ({
  getData: (params: ApiListParams) =>
    dispatch(
      getDebtorDebtsSlice.actions.request({
        debtorId,
        ...params,
      })
    ),
  resetData: () => dispatch(getDebtorDebtsSlice.actions.reset({ debtorId })),
});

export const DebtorDebtsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtorDebtsList);
