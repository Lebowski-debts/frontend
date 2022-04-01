import { debtorsReducer } from '@ducks/debtors/debtors.slice';
import { debtsReducer } from '@ducks/debts/debts.slice';
import { lenderDebtorReducer } from '@ducks/lenderDebtor/lenderDebtor.slice';
import { usersReducer } from '@ducks/users/users.slice';

export const reducers = {
  debtors: debtorsReducer,
  debts: debtsReducer,
  lenderDebtor: lenderDebtorReducer,
  users: usersReducer,
};
