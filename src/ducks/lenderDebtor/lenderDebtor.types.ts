import { ApiGetDebtorsParams } from '@common/types/api/debtor';

export interface GetLenderDebtorDebtsPayload extends ApiGetDebtorsParams {
  debtorId: number;
  lenderId: number;
}
