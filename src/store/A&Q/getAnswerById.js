import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getAnswerById = createAsyncThunk(
  "getAnswerById",
  async (id, thunkAPI, _) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get(`/dashboard/answers/show/${id}`);

      return res.data.answer_details;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getAnswerByIdSlice = createSlice({
  name: "getQuestionsById",
  initialState: { data: null, isLoading: false, error: null },

  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAnswerById.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAnswerById.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getAnswerById.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = null;
    });
  },
});

export default getAnswerByIdSlice.reducer;
