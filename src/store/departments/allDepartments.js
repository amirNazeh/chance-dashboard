import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getDepartments = createAsyncThunk(
  "departments",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.post("/dashboard/departments/index");
      return res.data.departments;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getDepartmentsSlice = createSlice({
  name: "departments",
  initialState: { DepartmentData: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getDepartments.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.DepartmentData = action.payload;
    });
    builder.addCase(getDepartments.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default getDepartmentsSlice.reducer;
