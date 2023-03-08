import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { project: [], isSearching: false },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearched: (state, action) => {
      state.value.project = action.payload.project
      state.value.isSearching = true;
    },
    resetSearch: (state, action) => {
      state.value.project = []
      state.value.isSearching = false;
    },
  },
});

export const { setSearched, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
