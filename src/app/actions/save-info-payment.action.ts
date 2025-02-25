"use server";

import { cookies } from "next/headers";

import { decrypt, encrypt } from "@/lib/crypt-data";

import { DecryptUrlResponse } from "../dto/decry.dto";

const COOKIES_NAME = {
  BODY_PAY_INFO: "body_pay_info",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveInfoPayment = async (data: any) => {
  const body = JSON.stringify(data);

  const bodyEncrypted = encrypt(body);

  (await cookies()).set(COOKIES_NAME.BODY_PAY_INFO, bodyEncrypted, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const getInfoPayment = async (): Promise<DecryptUrlResponse> => {
  const bodyEncrypted = (await cookies()).get(
    COOKIES_NAME.BODY_PAY_INFO
  )?.value;

  if (!bodyEncrypted) {
    throw new Error("No body encrypted");
  }

  const body = decrypt(bodyEncrypted);

  return JSON.parse(body);
};
