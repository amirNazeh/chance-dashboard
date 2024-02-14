import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";

import { getUserEvents } from "store/userEvent/getUserEvent";

export const deleteUserEvent = createAsyncThunk(
  "deleteEvent",
  async (data, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(
        `/dashboard/user_event/delete/${data.id}`
      );

      toast.success(res.data.messege);
      dispatch(getUserEvents(data.userId));
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
