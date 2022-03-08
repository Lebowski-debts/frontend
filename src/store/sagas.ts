import { all } from '@redux-saga/core/effects';

import { debtorsSagas } from '@ducks/debtors/debtors.sagas';

export function* sagas() {
  yield all([debtorsSagas()]);
}
