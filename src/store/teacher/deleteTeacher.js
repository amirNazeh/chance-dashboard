import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";
import { getAllTeacher } from "./allTeacher";
export const deleteTeacher = createAsyncThunk(
  "child/deleteChild",
  async (id, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(
        `/dashboard/teachers/delete/${id}`
      );
      toast.success(res.data.message);
      dispatch(getAllTeacher());
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
