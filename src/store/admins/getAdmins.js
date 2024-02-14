import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getAllAdmins = createAsyncThunk(
  "getAllAdmins",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get("/dashboard/admins/index");
      return res.data.users;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getAllAdminsSlice = createSlice({
  name: "getAllAdmins",
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllAdmins.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllAdmins.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllAdmins.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default getAllAdminsSlice.reducer;
