"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "../composable/use.payment";
import pino from "pino";

const logger = pino();

const CheckoutForm: React.FC = () => {
  //Get Query Params URL Base64 / Encripted

  const amount = 40.0;
  const purchaseNumber = 2020100906;
  const customerId = "11119922";
  const clientMail = "rguevara@belity.app";

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { sessionKey } = useSession({
    amount,
    clientId: customerId,
    email: clientMail,
  });

  useEffect(() => {
    const openForm = () => {
      const apiUrl = `/api/payment?amount=${amount}&purchaseNumber=${purchaseNumber}`;
      const logo = "http://localhost:3000/images/belity-app.png";

      if (window.VisanetCheckout) {
        window.VisanetCheckout.configure({
          sessiontoken: sessionKey,
          channel: "web",
          merchantid: "456879852",
          purchasenumber: purchaseNumber,
          amount: amount,
          expirationminutes: "20",
          timeouturl: "/",
          merchantlogo: logo,
          action: apiUrl,
          formbuttoncolor: "#3900AC",
          buttonsize: "LARGE",
          hidexbutton: "true",
          usertoken: clientMail,
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
        src="https://static-content-qas.vnforapps.com/env/sandbox/js/checkout.js"
        onLoad={() => {
          logger.info("Checkout Script Loaded Successfully");
          setIsScriptLoaded(true);
        }}
      />
    </>
  );
};

export default CheckoutForm;
