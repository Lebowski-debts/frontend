import { ApiGetDebtorsParams } from '@common/types/api/debtor';

export interface GetDebtorsPayload extends ApiGetDebtorsParams {
  userId: number;
}
