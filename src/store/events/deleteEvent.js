import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";
import { getEvents } from "./getEvents";

export const deleteEvent = createAsyncThunk(
  "deleteEvent",
  async (id, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(`/dashboard/events/delete/${id}`);

      toast.success(res.data.messege);
      dispatch(getEvents());
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
