import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
  },
  reducers: {
    cacheResults: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    updateSearchResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { cacheResults, updateSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
