import axios, { AxiosResponse } from "axios";

export const serverResponseHandler = <T>(res: AxiosResponse<T>): T => res.data;

export const serverInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
