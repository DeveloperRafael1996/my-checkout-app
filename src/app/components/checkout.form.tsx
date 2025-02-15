"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "../composable/use.payment";
import pino from "pino";

const CheckoutForm: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const logger = pino();

  const { sessionKey } = useSession();
  logger.info({ sessionKey });

  useEffect(() => {
    const openForm = () => {
      const amount = 10;
      const purchaseNumber = 2020100901;
      const apiUrl = `/api/payment?amount=${amount}&purchaseNumber=${purchaseNumber}`;

      if (window.VisanetCheckout) {
        window.VisanetCheckout.configure({
          sessiontoken: sessionKey,
          channel: "web",
          merchantid: "456879852",
          purchasenumber: purchaseNumber,
          amount: amount,
          expirationminutes: "5",
          timeouturl: "/",
          merchantlogo: "",
          merchantname: "Belicorp SAC",
          action: apiUrl,
          formbuttoncolor: "#430AFF",
          buttonsize: "LARGE",
        });

        window.VisanetCheckout.open();
      } else {
        console.error("VisanetCheckout Script Not Loaded Property");
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
        src="https://static-content-qas.vnforapps.com/v2/js/checkout.js"
        onLoad={() => {
          console.log("Checkout Script Loaded Successfully");
          setIsScriptLoaded(true);
        }}
      />
    </>
  );
};

export default CheckoutForm;
