import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getAllTeacher = createAsyncThunk(
  "getTeacher",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get("/dashboard/teachers/index");
      return res.data.teachers;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getTeacherSlice = createSlice({
  name: "getTeacher",
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllTeacher.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllTeacher.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllTeacher.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default getTeacherSlice.reducer;
