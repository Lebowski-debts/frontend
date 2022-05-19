import { debtorsReducer } from '@ducks/debtors/debtors.slice';
import { debtsReducer } from '@ducks/debts/debts.slice';
import { lenderDebtorReducer } from '@ducks/lenderDebtor/lenderDebtor.slice';
import { lendersReducer } from '@ducks/lenders/lenders.slice';
import { usersReducer } from '@ducks/users/users.slice';

export const reducers = {
  debtors: debtorsReducer,
  lenders: lendersReducer,
  lenderDebtor: lenderDebtorReducer,
  debts: debtsReducer,
  users: usersReducer,
};
