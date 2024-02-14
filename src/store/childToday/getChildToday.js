import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getChildToday = createAsyncThunk(
  "getServey",
  async (id, thunkAPI, _) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(`/dashboard/today_childs/index`, {
        teacher_id: id,
      });

      return res.data.TodayChilds;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getChildTodayDataSlice = createSlice({
  name: "getServey",
  initialState: { childTodayData: null, childTodayLoading: false, error: null },

  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getChildToday.pending, (state, action) => {
      // Add user to the state array
      state.childTodayLoading = true;
      state.error = null;
    });
    builder.addCase(getChildToday.fulfilled, (state, action) => {
      // Add user to the state array
      state.childTodayLoading = false;
      state.error = null;
      state.childTodayData = action.payload;
    });
    builder.addCase(getChildToday.rejected, (state, action) => {
      state.error = action.payload;
      state.childTodayLoading = false;
      state.childTodayData = null;
    });
  },
});

export default getChildTodayDataSlice.reducer;
