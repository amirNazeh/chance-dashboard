import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "Config/axios";
import { toast } from "react-toastify";
import { getAllAdmins } from "./getAdmins";

export const deleteAdmin = createAsyncThunk(
  "deleteAdmin",
  async (id, thunkAPI, _) => {
    const { dispatch } = thunkAPI;

    try {
      const res = await axiosInstance.delete(`/dashboard/admins/delete/${id}`);
      toast.success(res.data.messege);
      dispatch(getAllAdmins());
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
