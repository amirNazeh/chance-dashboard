import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getQuestionsById = createAsyncThunk(
  "getQuestionsById",
  async (id, thunkAPI, _) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get(`/dashboard/questions/show/${id}`);

      return res.data.question_details;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getQuestionsByIdSlice = createSlice({
  name: "getQuestionsById",
  initialState: { data: null, isLoading: false, error: null },

  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getQuestionsById.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getQuestionsById.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getQuestionsById.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = null;
    });
  },
});

export default getQuestionsByIdSlice.reducer;
