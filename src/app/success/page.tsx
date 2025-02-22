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
//import { useClienteStore } from "@/store/cliente.store";

const SuccessPageContent = () => {
  const [transactionData, setTransactionData] =
    useState<TransactionState | null>(null);

  const searchParams = useSearchParams();
  const transactionToken = searchParams.get("transactionToken");
  const purchaseNumber = searchParams.get("purchaseNumber");
  const amount = Number(searchParams.get("amount"));

  console.log({ transactionToken, purchaseNumber, amount });

  const { onHandleAuthorization } = useAuthorizationMutation();

  //const clientId = useClienteStore((state) => state.clientId);
  //const clearClientId = useClienteStore((state) => state.clearClientId);
  //const { clientId } = useClienteStore();
  //console.log("SuccessPageContent:", clientId);

  const handleAuthorization = useCallback(async () => {
    if (transactionToken && purchaseNumber && amount) {
      const request: RequestWebhookDto = {
        tokenId: transactionToken,
        amount: amount,
        clientId: 12,
        purchaseNumber: purchaseNumber,
      };

      try {
        const res = (await onHandleAuthorization(request)) as Transaction;
        setTransactionData({ status: "success", data: res });
        //clearClientId();
      } catch (error) {
        //clearClientId();
        if (axios.isAxiosError(error) && error.response) {
          setTransactionData({
            status: "error",
            error: error.response.data as ErrorTransaction,
          });
        } else {
          //clearClientId();
          //Clean Store
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
