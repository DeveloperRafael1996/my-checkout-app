"use client";

import { useSearchParams } from "next/navigation";
import { usePaymentSetup } from "../hooks/usePaymentSetup";
import CheckoutFormNiubiz from "./checkout.niubiz";
// import { useClienteStore } from "@/store/cliente.store";

export const SearchParamsComponent = () => {
  const searchParams = useSearchParams();
  const dataParams = searchParams.get("data");
  const ivParams = searchParams.get("iv");

  return <CheckoutWrapper dataParams={dataParams} ivParams={ivParams} />;
};

const CheckoutWrapper = ({
  dataParams,
  ivParams,
}: {
  dataParams: string | null;
  ivParams: string | null;
}) => {
  //const store = useClienteStore();

  const { bodyPay, sessionKey } = usePaymentSetup(dataParams, ivParams);
  if (bodyPay?.customerId) {
    //store.setClientId(bodyPay.customerId);
  }

  return <CheckoutFormNiubiz bodyPay={bodyPay} sessionKey={sessionKey} />;
};
