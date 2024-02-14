import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";
import { getNotes } from "./getNotes";

export const deleteNote = createAsyncThunk(
  "deleteEvent",
  async (data, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(
        `/dashboard/notes/delete/${data.id}`
      );

      toast.success(res.data.messege);
      dispatch(getNotes(data.userId));
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
