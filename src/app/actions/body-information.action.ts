"use server";

import { decrypt, encrypt } from "@/lib/crypt-data";
import { cookies } from "next/headers";
import { DecryptUrlResponse } from "../dto/decry.dto";

const COOKIES_NAME = {
  BODY_INFORMATION: "body_information",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveBodyInformation = async (bodyInformation: any) => {
  const body = JSON.stringify(bodyInformation);

  const bodyEncrypted = encrypt(body);

  (await cookies()).set(COOKIES_NAME.BODY_INFORMATION, bodyEncrypted, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const getBodyInformation = async (): Promise<DecryptUrlResponse> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIES_NAME.BODY_INFORMATION);

  if (!cookie) throw new Error("No body encrypted");

  const body = decrypt(cookie.value);

  return JSON.parse(body);
};
