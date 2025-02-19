"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import pino from "pino";
import { DecryptUrlResponse } from "../dto/decry.dto";

const logger = pino();
const checkoutScript = process.env.NEXT_PUBLIC_CHECKOUT_SCRIPT;

interface CheckoutFormProps {
  bodyPay: DecryptUrlResponse | null;
  sessionKey: string;
}

const CheckoutFormNiubiz: React.FC<CheckoutFormProps> = ({
  bodyPay,
  sessionKey,
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    const openForm = () => {
      const apiUrl = `/api/payment?amount=${bodyPay?.amount}&purchaseNumber=${bodyPay?.purchaseNumber}`;
      const logo = `${origin}/images/belity-app.png`;

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

    if (isScriptLoaded && sessionKey && bodyPay) {
      openForm();
    }
  }, [sessionKey, isScriptLoaded, bodyPay]);

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

export default CheckoutFormNiubiz;
