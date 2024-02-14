import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";
import { getAllChild } from "./allChild";
import { toast } from "react-toastify";

export const deleteChild = createAsyncThunk(
  "child/deleteChild",
  async (id, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(`/dashboard/childs/delete/${id}`);
      toast.success(res.data.messege);
      dispatch(getAllChild());
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
