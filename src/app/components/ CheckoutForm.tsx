"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CheckoutForm: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const openForm = () => {
      if (window.VisanetCheckout) {
        window.VisanetCheckout.configure({
          sessiontoken:
            "3b9d3db5141bdd4fd71dd69915dc6b082679b4f2548825e4e64a91c033af13ba",
          channel: "web",
          merchantid: "456879852",
          purchasenumber: 2020100901,
          amount: 10.5,
          expirationminutes: "20",
          timeouturl: "about:blank",
          merchantlogo: "",
          formbuttoncolor: "#000000",
          merchantname: "Belicorp SAC",
          action: "",
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
