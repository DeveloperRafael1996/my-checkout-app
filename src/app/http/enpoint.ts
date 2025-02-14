import axios from "axios";

const API_BASE_URL = "https://apisandbox.vnforappstest.com";
const API_BASE_URL_MS = "http://localhost:8080";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const http_pay = axios.create({
  baseURL: API_BASE_URL_MS,
  headers: { "Content-Type": "application/json" },
});
