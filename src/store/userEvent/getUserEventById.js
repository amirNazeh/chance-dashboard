import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getUserEventById = createAsyncThunk(
  "getNoteById",
  async (id, thunkAPI, _) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get(`/dashboard/user_event/show/${id}`);

      return res.data.event_details;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getUserEventByIdSlice = createSlice({
  name: "getNoteById",
  initialState: { data: null, isLoading: false, error: null },

  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUserEventById.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserEventById.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getUserEventById.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = null;
    });
  },
});

export default getUserEventByIdSlice.reducer;
