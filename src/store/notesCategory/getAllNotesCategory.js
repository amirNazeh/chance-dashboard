import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getNotesCategory = createAsyncThunk(
  "note_category",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.post("/dashboard/note_category/index");
      return res.data.note_category;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getNotesCategorySlice = createSlice({
  name: "note_category",
  initialState: { categoryData: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getNotesCategory.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getNotesCategory.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.categoryData = action.payload;
    });
    builder.addCase(getNotesCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default getNotesCategorySlice.reducer;
