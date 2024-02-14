import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";

import { getQuestions } from "./getQuestions";

export const deleteAnswers = createAsyncThunk(
  "deleteAnswers",
  async (data, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(
        `/dashboard/answers/delete/${data.id}`
      );

      toast.success(res.data.messege);
      dispatch(getQuestions(data.surveyId));
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
