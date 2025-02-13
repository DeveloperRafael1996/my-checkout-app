"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CheckoutForm: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const openForm = () => {
      const amount = 10;
      const purchaseNumber = 2020100901;
      //const url = `/success?amount=${amount}&purchaseNumber=${purchaseNumber}`;
      const url = "/api/payment";

      if (window.VisanetCheckout) {
        window.VisanetCheckout.configure({
          sessiontoken:
            "2fad47eede82c3054f49dae36e1d6d64bfe953d7505d02be20f2eecb28c8d502",
          channel: "web",
          merchantid: "456879852",
          purchasenumber: purchaseNumber,
          amount: amount,
          expirationminutes: "5",
          timeouturl: "/",
          merchantlogo: "",
          merchantname: "Belicorp SAC",
          action: url,
          formbuttoncolor: "#000000",
          buttonsize: "LARGE",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          complete: function (params: any) {
            console.log(params);
          },
        });

        window.VisanetCheckout.open();
      } else {
        console.error("VisanetCheckout Script Not Loaded Properly");
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
