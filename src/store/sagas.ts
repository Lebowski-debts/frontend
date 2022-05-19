import { all } from '@redux-saga/core/effects';

import { debtorsSagas } from '@ducks/debtors/debtors.sagas';
import { debtsSagas } from '@ducks/debts/debts.sagas';
import { usersSagas } from '@ducks/users/users.sagas';
import { lendersSagas } from '@ducks/lenders/lenders.sagas';
import { lenderDebtorSagas } from '@ducks/lenderDebtor/lenderDebtor.sagas';

export function* sagas() {
  yield all([
    debtorsSagas(),
    lendersSagas(),
    lenderDebtorSagas(),
    debtsSagas(),
    usersSagas(),
  ]);
}
