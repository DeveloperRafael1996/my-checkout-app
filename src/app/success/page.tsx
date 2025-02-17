"use client";

import { useSearchParams } from "next/navigation";
import { RequestWebhookDto } from "../dto/authorization.dto";
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
import { useAuthorizationMutation } from "../composable/use.payment";

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
      const request: RequestWebhookDto = {
        tokenId: transactionToken,
        amount: amount,
        clientId: 12222211,
        email: "rguevara@belity.app",
        purchaseNumber: purchaseNumber,
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
          <SuccessMobile
            data={transactionData}
            purchaseNumber={purchaseNumber!}
          ></SuccessMobile>
        ) : (
          <PagoErrorMobile
            state={transactionData}
            purchaseNumber={purchaseNumber!}
          ></PagoErrorMobile>
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
