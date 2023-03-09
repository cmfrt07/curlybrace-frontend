import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { myResult: 0 },
};

export const resultSlice = createSlice({
  name: "resultNew",
  initialState,
  reducers: {
    setMyResult: (state, action) => {
      state.value.myResult = action.payload.myResult;
    },
  },
});

export const { setMyResult } = resultSlice.actions;
export default resultSlice.reducer;
