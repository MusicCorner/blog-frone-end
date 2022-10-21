import { createSelector } from 'reselect';
import { isProcessing, pure } from 'create-async-slice';

import { RootState } from '@store';
import { ApiUser } from '@common/types/apiTypes';

export const selectUsersData = createSelector(
  (state: RootState) => state.example.value || ({} as ApiUser),
  pure
);

export const selectIsGetUsersProcessing = (state: RootState) =>
  isProcessing(state.example);
