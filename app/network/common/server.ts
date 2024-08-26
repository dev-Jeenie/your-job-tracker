import axios, { AxiosResponse } from "axios";

export const serverResponseHandler = <T>(res: AxiosResponse<T>): T => res.data;

export const serverInstance = axios.create({
  baseURL: "http://localhost:9001/",
  headers: {
    "Content-Type": "application/json",
  },
});
