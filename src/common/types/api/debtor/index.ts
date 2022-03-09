import { ApiListParams } from '..';

export interface ApiGetDebtorUser {
  telegramUserId: number;
  id: number;
  telegramUserLogin?: string;
  nickname?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiGetDebtor {
  user: ApiGetDebtorUser;
  debtsInfo: {
    count: number;
    actualSum: number;
    firstDebtDate: string;
    lastDebtDate: string;
    initialSum: number;
    hasExpiredDebts: boolean;
  };
}

export type PaymentStatus = 'NEW' | 'PAID' | 'IN_PROGRESS';

export type ExpirationStatus = 'NOT_EXPIRED' | 'EXPIRED';

export interface ApiGetDebtorsParams extends ApiListParams {
  paymentStatusList?: PaymentStatus;
  expirationStatus?: ExpirationStatus;
}
