export interface ApiGetDebtorUser {
  telegramUserId: number;
  id: number;
  telegramUserLogin?: string;
  nickname?: string;
  createdAt: Date;
  updatedAt: Date;
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
