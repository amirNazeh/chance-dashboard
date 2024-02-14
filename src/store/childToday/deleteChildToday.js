import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";
import { getChildToday } from "./getChildToday";
export const deleteChildToday = createAsyncThunk(
  "deleteEvent",
  async (data, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(
        `/dashboard/today_childs/delete/${data.id}`
      );

      toast.success(res.data.messege);
      dispatch(getChildToday(data.userId));
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
