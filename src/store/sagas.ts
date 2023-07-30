import { all } from '@redux-saga/core/effects';

import { authSagas } from '@ducks/auth/auth.sagas';
import { postsSagas } from '@ducks/posts/posts.sagas';

export function* sagas() {
  yield all([authSagas(), postsSagas()]);
}
