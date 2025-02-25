"use server";

import { decrypt, encrypt } from "@/lib/crypt-data";
import { cookies } from "next/headers";
import { ErrorTransaction } from "../dto/transaction.dto";

interface SaveTransactionData {
  date: number;
  card: string;
  purchaseNumber: string;
  currency: string;
  amount: number;
  name: string;
}

const COOKIES_NAME = {
  TRANSACTION_DATA: "transaction_data",
  TRANSACTION_ERROR: "transaction_error",
};

export const saveTransactionData = async (data: SaveTransactionData) => {
  const body = JSON.stringify(data);

  const bodyEncrypted = encrypt(body);

  (await cookies()).set(COOKIES_NAME.TRANSACTION_DATA, bodyEncrypted, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const getTransactionData = async (): Promise<SaveTransactionData> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIES_NAME.TRANSACTION_DATA);

  if (!cookie) throw new Error("No body encrypted");

  const body = decrypt(cookie.value);

  return JSON.parse(body);
};

export const saveTransactionError = async (error: ErrorTransaction) => {
  const body = JSON.stringify(error);

  const bodyEncrypted = encrypt(body);

  (await cookies()).set(COOKIES_NAME.TRANSACTION_ERROR, bodyEncrypted, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const getTransactionError = async (): Promise<ErrorTransaction> => {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(COOKIES_NAME.TRANSACTION_ERROR);

  if (!cookie) throw new Error("No body encrypted");

  const body = decrypt(cookie.value);

  return JSON.parse(body);
};
