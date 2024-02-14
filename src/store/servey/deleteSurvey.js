import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";
import { getSurvey } from "store/servey/getSurvey";

export const deleteSurvey = createAsyncThunk(
  "deleteEvent",
  async (data, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(
        `/dashboard/survey/delete/${data.id}`
      );

      toast.success(res.data.messege);
      dispatch(getSurvey(data.userId));
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
