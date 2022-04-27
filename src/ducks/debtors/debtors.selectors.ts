import { isProcessing, _AsyncState } from '@common/store/helpers';
import { RootState } from '@store';

export const selectGetDebtors = (state: RootState) => state.debtors.getDebtors;

export const selectGetDebtorsData = (state: RootState) =>
  selectGetDebtors(state).value?.data;

export const selectDebtorDebtsInfo = (state: RootState, userId: number) =>
  selectGetDebtorsData(state)?.entities[userId];

export const selectDebtorsListIds = (state: RootState) =>
  selectGetDebtorsData(state)?.keys || ([] as number[]);

export const selectGetDebtorsIsProcessing = (state: RootState) =>
  isProcessing(selectGetDebtors(state));

export const selectDebtorDebts = (state: RootState, lenderDebtorKey: string) =>
  state.debtors.getDebtorDebts[lenderDebtorKey];

export const selectLenderDebtorDebtsData = (
  state: RootState,
  lenderDebtorKey: string
) => selectDebtorDebts(state, lenderDebtorKey).value;

export const selectLenderDebtorDebtsIsProcessing = (
  state: RootState,
  lenderDebtorKey: string
) =>
  isProcessing(
    selectDebtorDebts(state, lenderDebtorKey) as _AsyncState<unknown, unknown>
  );
