import { ApiGetDebtorsParams } from '@common/types/api/debtor';

export interface GetDebtorDebtsPayload extends ApiGetDebtorsParams {
  debtorId: number;
  lenderId: number;
}
