"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CheckoutForm: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const openForm = () => {
      const amount = 10;
      const purchaseNumber = 2020100901;
      const apiUrl = `/api/payment?amount=${amount}&purchaseNumber=${purchaseNumber}`;

      if (window.VisanetCheckout) {
        window.VisanetCheckout.configure({
          sessiontoken:
            "af886e279a712612a02707ae77be843dcf77d7db4f89fe766213bee080a11354",
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
