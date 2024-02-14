import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

export const getSurvey = createAsyncThunk(
  "getServey",
  async (id, thunkAPI, _) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axiosInstance.post(`/dashboard/survey/index`, {
        department_id: id,
      });

      return res.data.survey;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getSurveySlice = createSlice({
  name: "getServey",
  initialState: { surveyData: null, loading: false, error: null },

  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getSurvey.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSurvey.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.error = null;
      state.surveyData = action.payload;
    });
    builder.addCase(getSurvey.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.surveyData = null;
    });
  },
});

export default getSurveySlice.reducer;
