import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { project: [], isSearching: false, length: null },
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
    setLength: (state, action) => {
      state.value.length = action.payload.length
    },
    clearLength: (state, action) => {
      state.value.length = null
    },
  },
});

export const { setSearched, resetSearch, setLength, clearLength } = searchSlice.actions;
export default searchSlice.reducer;
