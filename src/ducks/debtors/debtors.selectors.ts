import { isProcessing } from '@common/store/helpers';
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
