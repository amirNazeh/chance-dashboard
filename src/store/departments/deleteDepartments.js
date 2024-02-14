import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";

import { toast } from "react-toastify";
import { getDepartments } from "./allDepartments";

export const deleteDepartment = createAsyncThunk(
  "deleteEvent",
  async (id, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(
        `/dashboard/departments/delete/${id}`
      );

      toast.success(res.data.messege);
      dispatch(getDepartments());
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
