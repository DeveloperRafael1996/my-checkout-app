"use client";

import { useSearchParams } from "next/navigation";
import { useAuthorizationMutation } from "../composable/use.niubiz";
import { AuthorizationData } from "../dto/authorization.dto";
import { useEffect, useState } from "react";
import pino from "pino";

import {
  ErrorTransaction,
  Transaction,
  TransactionState,
} from "../dto/transaction.dto";
import axios from "axios";
// import { convertDate } from "../utils/date";

const SuccessPage = () => {
  //Generate Token
  const logger = pino();

  const [transactionData, setTransactionData] =
    useState<TransactionState | null>(null);

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
        setTransactionData({ status: "success", data: res });
      } catch (error) {
        console.error("Api Token");
        console.error(error);

        if (axios.isAxiosError(error)) {
          if (error.response) {
            const response = error.response.data as ErrorTransaction;
            setTransactionData({ status: "error", error: response });

            /* Step 2
            console.error("Error Autorización:", {
              status: error.response.status,
              data: error.response.data,
            });
            */
          } else {
            console.error("Error Sin Respuesta Servidor:", error.message);
            logger.error("Error Sin Respuesta Servidor:", error.message);
          }
        } else {
          console.error("Error Desconocido:", error);
          logger.error("Error Desconocido:", error);
        }
      }
    }
  };

  useEffect(() => {
    handleAuthorization();
  }, [transactionToken, purchaseNumber, amount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {/* <h1
        className={`text-2xl font-bold ${
          transactionData && transactionData.status === "success"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {transactionData && transactionData.status === "success"
          ? "Pago Exitoso 🎉"
          : "Error Pago 😞"}
      </h1> */}

      {transactionData ? (
        transactionData.status === "success" ? (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-xl">
            <p className="text-lg font-semibold">
              Estado: {transactionData.data.dataMap.STATUS}
            </p>
            <p className="text-lg">
              Descripción: {transactionData.data.dataMap.ACTION_DESCRIPTION}
            </p>
            <p className="text-lg">Número de Compra: {purchaseNumber}</p>
            <p className="text-lg">
              Tarjeta: {transactionData.data.dataMap.CARD}
            </p>
            <p className="text-lg">
              Marca: {transactionData.data.dataMap.BRAND.toUpperCase()}
            </p>
            <p className="text-lg">
              Monto: {transactionData.data.order.amount}{" "}
              {transactionData.data.order.currency}
            </p>
            <p className="text-lg">
              Fecha Transacción: {transactionData.data.dataMap.TRANSACTION_DATE}
            </p>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg shadow-md w-full max-w-xl">
            <p className="text-lg">
              Error: {transactionData.error.data.STATUS}
            </p>
          </div>
        )
      ) : (
        <p className="text-lg">Procesando Transacción...</p>
      )}
    </div>
  );
};

export default SuccessPage;
