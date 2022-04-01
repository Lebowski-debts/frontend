import { all } from '@redux-saga/core/effects';

import { debtorsSagas } from '@ducks/debtors/debtors.sagas';
import { lenderDebtorSagas } from '@ducks/lenderDebtor/lenderDebtor.sagas';

export function* sagas() {
  yield all([debtorsSagas(), lenderDebtorSagas()]);
}
