import axios from "axios";

const API_BASE_URL = "https://apisandbox.vnforappstest.com";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
