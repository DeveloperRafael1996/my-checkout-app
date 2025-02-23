"use client";

import { useClienteStore } from "@/store/cliente.store";
import { apiauthorization } from "../actions/payment-setup.action";
import {
  ErrorTransaction,
  Transaction,
  TransactionState,
} from "../dto/transaction.dto";
import SuccessMobile from "../components/success";
import PagoErrorMobile from "../components/error.pay";
import MobileLoading from "../components/loading";
import { RequestWebhookDto } from "../dto/authorization.dto";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface ValidationDetail {
  column: string;
  errors: string[];
}

export default function Success() {
  const [transactionData, setTransactionData] =
    useState<TransactionState | null>(null);
  const searchParams = useSearchParams();
  const transactionToken = searchParams.get("transactionToken") ?? "";
  const purchaseNumber = Number(searchParams.get("purchaseNumber")) ?? "";
  const amount = Number(searchParams.get("amount")) || 0;
  //const clientId = useClienteStore((state) => state.clientId);

  const { clientId, name, clearClientData } = useClienteStore();

  useEffect(() => {
    const handleAuthorization = async () => {
      if (
        !transactionToken ||
        !purchaseNumber ||
        amount <= 0 ||
        !name ||
        !clientId
      )
        return;

      const request: RequestWebhookDto = {
        tokenId: transactionToken,
        amount,
        clientId,
        purchaseNumber,
        name,
      };

      console.log(`Request Authorization`);
      console.log(request);

      try {
        const res = (await apiauthorization(request)) as Transaction;
        setTransactionData({ status: "success", data: res });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const responseData = error.response.data;

          if (
            responseData?.mensaje === "Validación" &&
            Array.isArray(responseData.details)
          ) {
            const validationErrors = responseData.details.map(
              (detail: ValidationDetail) => ({
                column: detail.column,
                errors: detail.errors,
              })
            );

            throw new Error(`(${validationErrors})`);
          } else {
            setTransactionData({
              status: "error",
              error: error.response.data as ErrorTransaction,
            });
          }
        } else if (error instanceof Error) {
          throw new Error(`(${error})`);
        }
      } finally {
        clearClientData();
      }
    };

    handleAuthorization();
  }, [transactionToken, purchaseNumber, amount, clientId]);

  return (
    <div>
      {transactionData ? (
        transactionData.status === "success" ? (
          <SuccessMobile
            data={transactionData}
            purchaseNumber={purchaseNumber}
          />
        ) : (
          <PagoErrorMobile
            state={transactionData}
            purchaseNumber={purchaseNumber}
          />
        )
      ) : (
        <MobileLoading />
      )}
    </div>
  );
}
