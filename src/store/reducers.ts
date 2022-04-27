import { debtorsReducer } from '@ducks/debtors/debtors.slice';
import { debtsReducer } from '@ducks/debts/debts.slice';
import { usersReducer } from '@ducks/users/users.slice';

export const reducers = {
  debtors: debtorsReducer,
  debts: debtsReducer,
  users: usersReducer,
};
