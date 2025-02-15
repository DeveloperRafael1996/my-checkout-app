"use client";

import { useSearchParams } from "next/navigation";
import { useAuthorizationMutation } from "../composable/use.niubiz";
import { AuthorizationData } from "../dto/authorization.dto";
import { Suspense, useCallback, useEffect, useState } from "react";

import {
  ErrorTransaction,
  Transaction,
  TransactionState,
} from "../dto/transaction.dto";
import axios from "axios";

const SuccessPageContent = () => {
  const [transactionData, setTransactionData] =
    useState<TransactionState | null>(null);

  const searchParams = useSearchParams();
  const transactionToken = searchParams.get("transactionToken");
  const purchaseNumber = searchParams.get("purchaseNumber");
  const amount = Number(searchParams.get("amount"));
  const { onHandleAuthorization } = useAuthorizationMutation();

  const handleAuthorization = useCallback(async () => {
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
        if (axios.isAxiosError(error) && error.response) {
          setTransactionData({
            status: "error",
            error: error.response.data as ErrorTransaction,
          });
        } else {
          setTransactionData({
            status: "error",
            error: {
              errorCode: 400,
              errorMessage: "Transacción Fallida",
              data: {
                STATUS: "Error Niubiz",
              },
            },
          });
        }
      }
    }
  }, [transactionToken, purchaseNumber, amount, onHandleAuthorization]);

  useEffect(() => {
    handleAuthorization();
  }, [handleAuthorization]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
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
              Marca: {transactionData.data.dataMap.BRAND?.toUpperCase()}
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
              Error: {transactionData.error.data?.STATUS || "Error Desconocido Reload"}
            </p>
          </div>
        )
      ) : (
        <p className="text-lg">Procesando Transacción...</p>
      )}
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<p className="text-lg">Cargando...</p>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
