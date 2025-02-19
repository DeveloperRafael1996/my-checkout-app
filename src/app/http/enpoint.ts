import axios from "axios";

//const API_BASE_URL_MS = "http://localhost:8080";
const API_BASE_URL = "https://apisandbox.vnforappstest.com";
const API_BASE_URL_MS = "https://ms-pay-prod-700901035298.us-central1.run.app";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const http_pay = axios.create({
  baseURL: API_BASE_URL_MS,
  headers: { "Content-Type": "application/json" },
});
