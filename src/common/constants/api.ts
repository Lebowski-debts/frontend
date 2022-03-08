export const API_ROUTES = {
  DEBT: '/debt',
};

export const DEFAULT_LIST_PARAMS = {
  sortType: 'desc',
  orderField: 'lastDebtDate',
};

export const DEFAULT_DEBTORS_LIST_PARAMS = {
  ...DEFAULT_LIST_PARAMS,
  paymentStatusList: '',
};
