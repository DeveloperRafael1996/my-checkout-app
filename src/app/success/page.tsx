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

export default function Success() {
  const [transactionData, setTransactionData] =
    useState<TransactionState | null>(null);
  const searchParams = useSearchParams();
  const transactionToken = searchParams.get("transactionToken") ?? "";
  const purchaseNumber = Number(searchParams.get("purchaseNumber")) ?? "";
  const amount = Number(searchParams.get("amount")) || 0;

  const clientId = useClienteStore((state) => state.clientId);
  const clearClientId = useClienteStore((state) => state.clearClientId);

  useEffect(() => {
    const handleAuthorization = async () => {
      if (!transactionToken || !purchaseNumber || amount <= 0 || !clientId)
        return;

      const request: RequestWebhookDto = {
        tokenId: transactionToken,
        amount,
        clientId,
        purchaseNumber,
      };

      try {
        const res = (await apiauthorization(request)) as Transaction;
        setTransactionData({ status: "success", data: res });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setTransactionData({
            status: "error",
            error: error.response.data as ErrorTransaction,
          });
        }
      } finally {
        clearClientId();
      }
    };

    handleAuthorization();
  }, [transactionToken, purchaseNumber, amount, clientId, clearClientId]);

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
