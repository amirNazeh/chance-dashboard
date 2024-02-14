import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";
import { getNotesCategory } from "./getAllNotesCategory";

export const deleteNoteCategory = createAsyncThunk(
  "deletenote_category",
  async (id, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(
        `/dashboard/note_category/delete/${id}`
      );

      toast.success(res.data.messege);
      dispatch(getNotesCategory());
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
