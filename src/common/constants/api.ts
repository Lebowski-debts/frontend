export const API_ROUTES = {
  DEBT: '/debt',
  USER: '/user',
};

export const DEFAULT_LIST_PARAMS = {
  sortType: 'desc',
  onPage: 5,
};

export const DEFAULT_DEBTS_LIST_PARAMS = {
  ...DEFAULT_LIST_PARAMS,
  paymentStatusList: 'NEW,IN_PROGRESS',
};

export const DEFAULT_DEBTORS_LIST_PARAMS = {
  ...DEFAULT_LIST_PARAMS,
  orderField: 'lastDebtDate',
  paymentStatusList: 'NEW,IN_PROGRESS',
};

export const EXPIRATION_STATUSES = ['EXPIRED', 'NOT_EXPIRED'];

export const SORT_BY_VALUES = ['createdAt', 'expireDate'];
