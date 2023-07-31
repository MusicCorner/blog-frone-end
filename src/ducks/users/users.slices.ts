import { PayloadAction, combineReducers, createSlice } from '@reduxjs/toolkit';

import { NormalizedUsersState } from './users.types';

export const usersEntitiesSlice = createSlice({
  name: 'usersEntities',
  initialState: {} as NormalizedUsersState,
  reducers: {
    set: (state, { payload }: PayloadAction<NormalizedUsersState>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const usersReducer = combineReducers({
  entities: usersEntitiesSlice.reducer,
});
