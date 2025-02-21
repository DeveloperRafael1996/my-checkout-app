import axios from "axios";

//const API_BASE_URL_MS = "http://localhost:8080";
const API_BASE_URL_NIUBIZ = "https://apisandbox.vnforappstest.com";
const API_BASE_URL_MS_PAY = process.env.NEXT_PUBLIC_BASE_URL_MS_PAY;

export const http = axios.create({
  baseURL: API_BASE_URL_NIUBIZ,
  headers: { "Content-Type": "application/json" },
});

export const http_pay = axios.create({
  baseURL: "https://ms-pay-dev-700901035298.us-central1.run.app",
  headers: { "Content-Type": "application/json" },
});
