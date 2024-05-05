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
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
  },
});

export const { cacheResults, updateSearchResults, setSelectedTopic } =
  searchSlice.actions;
export default searchSlice.reducer;
