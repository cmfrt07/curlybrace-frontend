import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { lat: null, lon: null, country: null, name: null},
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    newLocation: (state, action) => {
      state.value.lat = action.payload.lat;
      state.value.lon = action.payload.lon;
      state.value.country = action.payload.country;
      state.value.name = action.payload.name;
    },
    clearLocation: (state) => {
      state.value.lat = null;
      state.value.lon = null;
      state.value.country = null;
      state.value.name = null;
    },
  },
});

export const { newLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
