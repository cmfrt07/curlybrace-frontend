import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { id: null },
};

export const projectIdSlice = createSlice({
  name: "projectId",
  initialState,
  reducers: {
    transferId: (state, action) => {
      //state.value.id = null;
      state.value.id = action.payload.id;
    },
  },
});

export const { transferId } = projectIdSlice.actions;
export default projectIdSlice.reducer;
