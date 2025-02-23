"use client";

import Script from "next/script";
import pino from "pino";
import { DecryptUrlResponse } from "../dto/decry.dto";
import { useClienteStore } from "@/store/cliente.store";

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
  const store = useClienteStore();

  const openForm = () => {
    if (!window.VisanetCheckout || !bodyPay || !sessionKey) {
      return;
    }

    store.setClientData(bodyPay);
    const apiUrl = `/api/payment?amount=${bodyPay.amount}&purchaseNumber=${bodyPay.purchaseNumber}`;
    const logo = `${window.location.origin}/images/belity-app.png`;

    window.VisanetCheckout.configure({
      sessiontoken: sessionKey,
      channel: "web",
      merchantid: process.env.NEXT_PUBLIC_MERCHANT_ID,
      purchasenumber: bodyPay.purchaseNumber,
      amount: bodyPay.amount,
      expirationminutes: "20",
      timeouturl: "/",
      merchantlogo: logo,
      action: apiUrl,
      formbuttoncolor: "#3900AC",
      buttonsize: "LARGE",
      hidexbutton: "true",
      usertoken: bodyPay.clientMail,
    });

    window.VisanetCheckout.open();
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={checkoutScript}
        onLoad={() => {
          logger.info("Checkout Script Loaded Successfully");
          if (bodyPay && sessionKey) {
            openForm();
          }
        }}
      />
    </>
  );
};

export default CheckoutFormNiubiz;
