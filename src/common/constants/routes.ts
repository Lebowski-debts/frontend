export const ROOT_ROUTES = {
  HOME: '/',

  DEBTORS: '/debtors',

  LENDERS: '/lenders',

  SETTINGS: '/settings',

  DEBTS: '/debts',

  LOGOUT: '/logout',

  get DEBTOR_DEBTS() {
    return `${this.DEBTORS}/debtorId/:debtorId${this.DEBTS}`;
  },

  getDebtorDebtsRoute: (debtorId: number) =>
    `${ROOT_ROUTES.DEBTORS}/debtorId/${debtorId}${ROOT_ROUTES.DEBTS}`,

  get CREATE_DEBTOR_DEBT() {
    return `${this.DEBTORS}/debtorId/:debtorId/new-debt`;
  },

  getCreateDebtorDebtRoute: (debtorId: number) =>
    `${ROOT_ROUTES.DEBTORS}/debtorId/${debtorId}/new-debt`,

  get PAY_THE_DEBT_OFF() {
    return `${this.DEBTORS}/debtorId/:debtorId/pay-the-debt-off/:debtId`;
  },

  getPayTheDebtOffRoute: (debtorId: number, debtId: number) =>
    `${ROOT_ROUTES.DEBTORS}/debtorId/${debtorId}/pay-the-debt-off/${debtId}`,

  USERS: '/users',

  getUserRoute: (userId: number) => `${ROOT_ROUTES.USERS}/${userId}`,
};
