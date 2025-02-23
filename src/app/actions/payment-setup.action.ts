"use server";

import { RequestWebhookDto } from "../dto/authorization.dto";
import {
  DecryptUrl,
  DecryptUrlResponse,
  DecryptUrlSessionResponse,
} from "../dto/decry.dto";
import { Security } from "../dto/security.dto";
import { RequestSessionDto, SessionResponse } from "../dto/sesion.dto";
import { TransactionResponse } from "../dto/transaction.dto";
import { http_pay } from "../http/enpoint";

export const apiToken = async (): Promise<Security> => {
  const response = await http_pay.get("/payment/v1/security");
  return response.data;
};

export const apiSession = async (
  request: RequestSessionDto
): Promise<SessionResponse> => {
  const response = await http_pay.post("/payment/v1/session", request);
  return response.data;
};

export const apiauthorization = async (
  data: RequestWebhookDto
): Promise<TransactionResponse> => {
  const response = await http_pay.post("/payment/v1/authorization", data);
  return response.data;
};

export const decryptUrl = async (
  request: DecryptUrl
): Promise<DecryptUrlResponse> => {
  const response = await http_pay.post("/encrypt/v1/decrypt-url", request);
  return response.data;
};

export const decryptUrlSession = async (
  request: DecryptUrl
): Promise<DecryptUrlSessionResponse> => {
  const response = await http_pay.post(
    "/encrypt/v1/decrypt-url-seccion",
    request
  );
  return response.data;
};
