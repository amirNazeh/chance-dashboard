import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getTeacherById = createAsyncThunk(
  "child/getChildById",
  async (id, thunkAPI, _) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.get(`/dashboard/teachers/show/${id}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getTeacherByIdSlice = createSlice({
  name: "child",
  initialState: { data: null, isLoading: false, error: null },

  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getTeacherById.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTeacherById.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getTeacherById.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = null;
    });
  },
});

export default getTeacherByIdSlice.reducer;
