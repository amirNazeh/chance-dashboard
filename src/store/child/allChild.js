import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getAllChild = createAsyncThunk("getChild", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axiosInstance.get("/dashboard/childs/index");
    return res.data.childs;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data.message);
  }
});

const getChild = createSlice({
  name: "getChild",
  initialState: { childData: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllChild.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllChild.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.childData = action.payload;
    });
    builder.addCase(getAllChild.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default getChild.reducer;
