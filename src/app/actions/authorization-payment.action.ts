"use server";

import { isAxiosError } from "axios";
import { ErrorTransaction, ResponseTransaction } from "../dto/transaction.dto";
import { http_pay } from "../http/enpoint";

type AuthorizationPaymentSuccessResponse = {
  success: true;
  data: ResponseTransaction;
};

type AuthorizationPaymentErrorResponse = {
  success: false;
  data: ErrorTransaction;
};

interface AuthorizationData {
  token: string;
  amount: number;
  clientId: number;
  purchaseNumber: number;
  name: string;
}

export const authorizationPayment = async (
  data: AuthorizationData
): Promise<
  AuthorizationPaymentSuccessResponse | AuthorizationPaymentErrorResponse
> => {
  try {
    const body = {
      tokenId: data.token,
      amount: data.amount,
      clientId: data.clientId,
      purchaseNumber: data.purchaseNumber,
      name: data.name,
    };

    const response = await http_pay.post("/payment/v1/authorization", {
      ...body,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        data: error.response?.data as ErrorTransaction,
      };
    }

    return {
      success: false,
      data: error as ErrorTransaction,
    };
  }
};
