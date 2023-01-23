import { all } from '@redux-saga/core/effects';

import { authSagas } from '@ducks/auth/auth.sagas';

export function* sagas() {
  yield all([authSagas()]);
}
