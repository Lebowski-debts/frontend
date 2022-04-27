import { all } from '@redux-saga/core/effects';

import { debtorsSagas } from '@ducks/debtors/debtors.sagas';
import { debtsSagas } from '@ducks/debts/debts.sagas';
import { usersSagas } from '@ducks/users/users.sagas';

export function* sagas() {
  yield all([debtorsSagas(), debtsSagas(), usersSagas()]);
}
