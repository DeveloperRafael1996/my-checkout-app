import axios from "axios";
/*
  const API_BASE_URL_MS = "http://localhost:8080";
*/
const API_BASE_URL_NIUBIZ = "https://apisandbox.vnforappstest.com";
const API_BASE_URL_MS_PAY = process.env.NEXT_PUBLIC_URL_MS_PAY;
export const http = axios.create({
  baseURL: API_BASE_URL_NIUBIZ,
  headers: { "Content-Type": "application/json" },
});

export const http_pay = axios.create({
  baseURL: API_BASE_URL_MS_PAY,
  headers: { "Content-Type": "application/json" },
});
