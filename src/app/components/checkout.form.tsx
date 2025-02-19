"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  useDecryptUrlMutation,
  useSessionMutation,
} from "../composable/use.payment";
import pino from "pino";
import { useSearchParams } from "next/navigation";
import { DecryptUrlResponse } from "../dto/decry.dto";
import { mapperSession } from "../mapper/session.mapper";

const logger = pino();
const checkoutScript = process.env.NEXT_PUBLIC_CHECKOUT_SCRIPT;

const CheckoutForm: React.FC = () => {
  const searchParams = useSearchParams();
  const dataParams = searchParams.get("data");
  const ivParams = searchParams.get("iv");

  const [bodyPay, setBodyPay] = useState<DecryptUrlResponse | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
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

  useEffect(() => {
    const openForm = () => {
      const apiUrl = `/api/payment?amount=${bodyPay?.amount}&purchaseNumber=${bodyPay?.purchaseNumber}`;
      const logo = "http://localhost:3000/images/belity-app.png";

      if (window.VisanetCheckout) {
        window.VisanetCheckout.configure({
          sessiontoken: sessionKey,
          channel: "web",
          merchantid: process.env.NEXT_PUBLIC_MERCHANT_ID,
          purchasenumber: bodyPay?.purchaseNumber,
          amount: bodyPay?.amount,
          expirationminutes: "20",
          timeouturl: "/",
          merchantlogo: logo,
          action: apiUrl,
          formbuttoncolor: "#3900AC",
          buttonsize: "LARGE",
          hidexbutton: "true",
          usertoken: bodyPay?.clientMail,
        });

        window.VisanetCheckout.open();
      } else {
        logger.error("VisanetCheckout Script Not Loaded Property");
      }
    };

    if (isScriptLoaded && sessionKey) {
      openForm();
    }
  }, [sessionKey, isScriptLoaded]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={checkoutScript}
        onLoad={() => {
          logger.info("Checkout Script Loaded Successfully");
          setIsScriptLoaded(true);
        }}
      />
    </>
  );
};

export default CheckoutForm;
