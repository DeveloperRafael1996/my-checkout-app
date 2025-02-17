"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "../composable/use.payment";
import pino from "pino";

const logger = pino();

const CheckoutForm: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { sessionKey } = useSession();

  useEffect(() => {
    const openForm = () => {
      const amount = 10;
      const purchaseNumber = 2020100901;
      const apiUrl = `/api/payment?amount=${amount}&purchaseNumber=${purchaseNumber}`;
      const logo = "http://localhost:3000/images/belity-app.png";

      if (window.VisanetCheckout) {
        //merchantname: "Belicorp SAC",
        window.VisanetCheckout.configure({
          sessiontoken: sessionKey,
          channel: "web",
          merchantid: "456879852",
          purchasenumber: purchaseNumber,
          amount: amount,
          expirationminutes: "5",
          timeouturl: "/",
          merchantlogo: logo,
          action: apiUrl,
          formbuttoncolor: "#3900AC",
          buttonsize: "LARGE",
          hidexbutton: "true",
          usertoken: "jperez@gmail.com",
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
        src="https://static-content-qas.vnforapps.com/v2/js/checkout.js"
        onLoad={() => {
          logger.info("Checkout Script Loaded Successfully");
          setIsScriptLoaded(true);
        }}
      />
    </>
  );
};

export default CheckoutForm;
