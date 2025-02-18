"use client";

import { useEffect, useState } from "react";
import { DecryptUrlResponse } from "../dto/decry.dto";
import { mapperSession } from "../mapper/session.mapper";
import {
  useDecryptUrlMutation,
  useSessionMutation,
} from "../composable/use.payment";

export const usePaymentSetup = (
  dataParams: string | null,
  ivParams: string | null
) => {
  const [bodyPay, setBodyPay] = useState<DecryptUrlResponse | null>(null);
  const [sessionKey, setSessionKey] = useState<string>("");
  const { onHandleDecrypt } = useDecryptUrlMutation();
  const { onHandleSession } = useSessionMutation();

  useEffect(() => {
    const decryptData = async () => {
      if (dataParams && ivParams) {
        const res = await onHandleDecrypt({ data: dataParams, iv: ivParams });
        setBodyPay(res as DecryptUrlResponse);

        const requestSession = mapperSession(res);
        const { sessionKey: session } = await onHandleSession(requestSession);

        if (session) {
          setSessionKey(session);
        }
      }
    };

    decryptData();
  }, [dataParams, ivParams]);

  return { bodyPay, sessionKey };
};
