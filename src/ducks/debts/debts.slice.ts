import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NormalizedListValues } from '@common/types/api';
import { ApiGetDebt } from '@common/types/api/debt';

const initialState: { entities: { [key: number]: ApiGetDebt } } = {
  entities: {},
};

export const debtsSlice = createSlice({
  name: 'fillDebts',
  initialState,
  reducers: {
    fill: (state, action: PayloadAction<NormalizedListValues<ApiGetDebt>>) => {
      state.entities = action.payload;
    },
  },
});

export const debtsReducer = debtsSlice.reducer;
