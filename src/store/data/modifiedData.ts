import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modifiedData: null,
  modifiedDataLoading: false,
  modifiedDataErr: false,
};

const modifiedDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setModifiedData: (state, action) => {
      state.modifiedData = action.payload;
    },

    setModifiedDataLoading: (state, action) => {
      state.modifiedDataLoading = action.payload;
    },

    setModifiedDataErr: (state, action) => {
      state.modifiedDataErr = action.payload;
    },
  },
});

export const { setModifiedData, setModifiedDataLoading, setModifiedDataErr } =
  modifiedDataSlice.actions;

export default modifiedDataSlice.reducer;
