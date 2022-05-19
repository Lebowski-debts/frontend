import { isProcessing } from '@common/store/helpers';
import { RootState } from '@store';

export const selectGetLenders = (state: RootState) => state.lenders.getLenders;

export const selectGetLendersData = (state: RootState) =>
  selectGetLenders(state).value?.data;

export const selectLenderDebtsInfo = (state: RootState, userId: number) =>
  selectGetLendersData(state)?.entities[userId];

export const selectLendersListIds = (state: RootState) =>
  selectGetLendersData(state)?.keys || ([] as number[]);

export const selectGetDebtorsIsProcessing = (state: RootState) =>
  isProcessing(selectGetLenders(state));
