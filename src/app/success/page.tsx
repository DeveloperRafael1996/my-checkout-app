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
import SuccessMobile from "../components/success";
import PagoErrorMobile from "../components/error.pay";
import MobileLoading from "../components/loading";

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

          /* Fixear
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
          */
        }
      }
    }
  }, [transactionToken, purchaseNumber, amount, onHandleAuthorization]);

  useEffect(() => {
    handleAuthorization();
  }, [handleAuthorization]);

  return (
    <div>
      {transactionData ? (
        transactionData.status === "success" ? (
          <SuccessMobile></SuccessMobile>
        ) : (
          <PagoErrorMobile state={transactionData} purchaseNumber={purchaseNumber!}></PagoErrorMobile>
        )
      ) : (
        <MobileLoading></MobileLoading>
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
