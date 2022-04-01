import { isProcessing, _AsyncState } from '@common/store/helpers';
import { RootState } from '@store';

export const selectLenderDebtorDebts = (
  state: RootState,
  lenderDebtorKey: string
) => state.lenderDebtor.getLenderDebtorDebts[lenderDebtorKey];

export const selectLenderDebtorDebtsData = (
  state: RootState,
  lenderDebtorKey: string
) => selectLenderDebtorDebts(state, lenderDebtorKey).value;

export const selectLenderDebtorDebtsIsProcessing = (
  state: RootState,
  lenderDebtorKey: string
) =>
  isProcessing(
    selectLenderDebtorDebts(state, lenderDebtorKey) as _AsyncState<
      unknown,
      unknown
    >
  );
