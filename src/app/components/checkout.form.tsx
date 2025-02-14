"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "../composable/use.payment";
import pino from "pino";

const CheckoutForm: React.FC = () => {
  const logger = pino();

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { sessionKey } = useSession();
  logger.info(sessionKey);

  useEffect(() => {
    const openForm = () => {
      //Consume Token
      //Consume Session

      const amount = 10;
      const purchaseNumber = 2020100901;
      const apiUrl = `/api/payment?amount=${amount}&purchaseNumber=${purchaseNumber}`;

      if (window.VisanetCheckout) {
        window.VisanetCheckout.configure({
          sessiontoken:
            "b69571e1fa23e0b34e30fd0a5f7e5b50a7b4944bda828c41ad751410c35dd9d8",
          channel: "web",
          merchantid: "456879852",
          purchasenumber: purchaseNumber,
          amount: amount,
          expirationminutes: "5",
          timeouturl: "/",
          merchantlogo: "",
          merchantname: "Belicorp SAC",
          action: apiUrl,
          formbuttoncolor: "#000000",
          buttonsize: "LARGE",
        });

        window.VisanetCheckout.open();
      } else {
        console.error("VisanetCheckout Script Not Loaded Property");
      }
    };

    if (isScriptLoaded) {
      openForm();
    }
  }, [isScriptLoaded]);

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
