import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null },
};

export const profilTokenSlice = createSlice({
  name: "projectToken",
  initialState,
  reducers: {
    transferToken: (state, action) => {
      //state.value.id = null;
      state.value.token = action.payload.token;
    },
  },
});

export const { transferToken } = profilTokenSlice.actions;
export default profilTokenSlice.reducer;
