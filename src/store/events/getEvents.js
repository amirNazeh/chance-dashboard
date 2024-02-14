import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getEvents = createAsyncThunk("notes", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axiosInstance.get("/dashboard/events/index");
    return res.data.events;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data.message);
  }
});

const getEevntsSlice = createSlice({
  name: "child",
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getEvents.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getEvents.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default getEevntsSlice.reducer;
