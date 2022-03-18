import { PayloadAction } from '@reduxjs/toolkit';

export interface GetDebtorDebtsPayload {
  debtorId: number;
}

export type GetDebtorDebtsAction = PayloadAction<GetDebtorDebtsPayload>;
