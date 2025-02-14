"use client";

import { useSearchParams } from "next/navigation";
import { useAuthorizationMutation } from "../composable/use.niubiz";
import { AuthorizationData } from "../dto/authorization.dto";
import { useEffect } from "react";

const SuccessPage = () => {
  //Generate Token

  const searchParams = useSearchParams();
  const transactionToken = searchParams.get("transactionToken");
  const purchaseNumber = searchParams.get("purchaseNumber");
  const amount = Number(searchParams.get("amount"));
  const { onHandleAuthorization } = useAuthorizationMutation();

  /*
  const request: AuthorizationData = {
    captureType: "manual",
    channel: "web",
    countable: true,
    order: {
      amount: amount,
      currency: "PEN",
      purchaseNumber: purchaseNumber!,
      tokenId: transactionToken!,
    },
    dataMap: {
      urlAddress: "",
      partnerIdCode: "",
      serviceLocationCityName: "LIMA",
      serviceLocationCountrySubdivisionCode: "LIMA",
      serviceLocationCountryCode: "PER",
      serviceLocationPostalCode: "15074",
    },
  };
  */

  const handleAuthorization = async () => {
    if (transactionToken && purchaseNumber && amount) {
      const request: AuthorizationData = {
        captureType: "manual",
        channel: "web",
        countable: true,
        order: {
          amount: amount,
          currency: "PEN",
          purchaseNumber: purchaseNumber!,
          tokenId: transactionToken!,
        },
        dataMap: {
          urlAddress: "",
          partnerIdCode: "",
          serviceLocationCityName: "LIMA",
          serviceLocationCountrySubdivisionCode: "LIMA",
          serviceLocationCountryCode: "PER",
          serviceLocationPostalCode: "15074",
        },
      };

      try {
        const res = await onHandleAuthorization(request);
        console.log(res);
      } catch (error) {
        console.error("Error Autorización:", error);
      }
    }
  };

  useEffect(() => {
    handleAuthorization();
  }, [transactionToken, purchaseNumber, amount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-bold text-green-600">Pago Exitoso 🎉</h1>
      <p className="text-lg">Transaction: {transactionToken}</p>
      <p className="text-lg">Número de Compra: {purchaseNumber}</p>
      <p className="text-lg">Monto: {amount}</p>
    </div>
  );
};

export default SuccessPage;
