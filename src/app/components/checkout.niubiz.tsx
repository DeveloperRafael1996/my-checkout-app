"use client";

import { saveBodyInformation } from "../actions/body-information.action";
import { saveInfoPayment } from "../actions/save-info-payment.action";
// import pino from "pino";
import { DecryptUrlResponse } from "../dto/decry.dto";
import { useEffect } from "react";

// const logger = pino();

interface CheckoutFormProps {
  bodyPay: DecryptUrlResponse;
  sessionKey: string;
}

const CheckoutFormNiubiz: React.FC<CheckoutFormProps> = ({
  bodyPay,
  sessionKey,
}) => {
  const openForm = () => {
    if (!window.VisanetCheckout) {
      return;
    }

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
      formbuttoncolor: "#3F00FF",
      buttonsize: "LARGE",
      hidexbutton: "true",
      usertoken: bodyPay.clientMail,
      cardholderemail: bodyPay.clientMail,
    });

    window.VisanetCheckout.open();
  };

  useEffect(() => {
    if (!window.VisanetCheckout) {
      return;
    }

    saveBodyInformation(bodyPay).then(() => {
      saveInfoPayment(bodyPay).then((res) => {
        console.log(res);
      });
    });

    openForm();
  }, []);

  return <div></div>;
};

export default CheckoutFormNiubiz;
