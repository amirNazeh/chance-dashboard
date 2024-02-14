import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chanceeg.com/chance-project/public/api", // Set the base URL for all requests
  //   timeout: 5000, // Set a timeout of 5 seconds for all requests
  headers: {
    Accept: "application/json",

    "Content-Type": "multipart/form-data",
    // Set the Content-Type header for all requests to JSON
    // Set the Authorization header with a JWT token from local storage
    //Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
axiosInstance.interceptors.request.use(
  async (config) => {
    /* const user = {access: "token" } */
    const user = await localStorage.getItem("token");
    if (user) {
      config.headers["Authorization"] = `Bearer ${user}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
