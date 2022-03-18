import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApiGetUser } from '@common/types/api/user';
import { NormalizedListValues } from '@common/types/api';

const initialState: { entities: NormalizedListValues<ApiGetUser> } = {
  entities: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fill: (state, action: PayloadAction<NormalizedListValues<ApiGetUser>>) => {
      state.entities = { ...state.entities, ...action.payload };
    },
  },
});

export const usersReducer = usersSlice.reducer;
