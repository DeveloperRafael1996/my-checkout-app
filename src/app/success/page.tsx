"use client";

import { useSearchParams } from "next/navigation";
import { useAuthorizationMutation } from "../composable/use.niubiz";
import { AuthorizationData } from "../dto/authorization.dto";
import { useEffect, useState } from "react";
import { Transaction } from "../dto/transaction.dto";
// import { convertDate } from "../utils/date";

const SuccessPage = () => {
  //Generate Token

  const [transactionData, setTransactionData] = useState<Transaction | null>(
    null
  );
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
        const res = (await onHandleAuthorization(request)) as Transaction;
        setTransactionData(res);

        /* Data Show View
          const mapper = res.dataMap;
          const { date } = convertDate(mapper.TRANSACTION_DATE);

          const logValues = {
            STATUS: mapper.STATUS,
            ACTION_DESCRIPTION: mapper.ACTION_DESCRIPTION,
            purchaseNumber,
            CARD: mapper.CARD,
            BRAND: mapper.BRAND.toUpperCase(),
            amount: res.order.amount,
            currency: res.order.currency,
            TRANSACTION_DATE: mapper.TRANSACTION_DATE,
            DATE: date?.toISOString(),
          };

        */
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
      {transactionData ? (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold">
            Estado: {transactionData.dataMap.STATUS}
          </p>
          <p className="text-lg">
            Descripción: {transactionData.dataMap.ACTION_DESCRIPTION}
          </p>
          <p className="text-lg">Número de Compra:</p>
          <p className="text-lg">Tarjeta: {transactionData.dataMap.CARD}</p>
          <p className="text-lg">Marca: {transactionData.dataMap.BRAND.toUpperCase()}</p>
          <p className="text-lg">
            {" "}
            Monto: {transactionData.order.amount}{" "}
            {transactionData.order.currency}
          </p>
          <p className="text-lg">
            Fecha Transacción: {transactionData.dataMap.TRANSACTION_DATE}
          </p>
        </div>
      ) : (
        <p className="text-lg">Procesando Transacción...</p>
      )}
    </div>
  );
};

export default SuccessPage;
