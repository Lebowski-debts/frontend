import { isProcessing } from '@common/store/helpers';
import { RootState } from '@store';

export const selectGetDebtors = (state: RootState) => state.debtors.getDebtors;

export const selectGetDebtorsData = (state: RootState) =>
  selectGetDebtors(state).value;

export const selectGetDebtorsIsProcessing = (state: RootState) =>
  isProcessing(selectGetDebtors(state));
