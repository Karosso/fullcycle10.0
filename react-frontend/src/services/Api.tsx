import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
};

export const api = axios.create(config);
