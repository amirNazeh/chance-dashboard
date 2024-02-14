import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const addChild = createAsyncThunk(
  "addChild",
  async (childData, thunkAPI, _) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(
        "/dashboard/childs/create",
        childData
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = { data: null, isLoading: false, error: null };
const addChildSlice = createSlice({
  name: "addChild",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(addChild.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addChild.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(addChild.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = null;
    });
  },
});
export const { reset } = addChildSlice.actions;
export default addChildSlice.reducer;
