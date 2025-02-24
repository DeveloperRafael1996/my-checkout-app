"use client";

import { useClienteStore } from "@/store/cliente.store";
import {
  ErrorTransaction,
  ResponseTransaction,
  TransactionState,
} from "../dto/transaction.dto";
import SuccessMobile from "../components/success";
import PagoErrorMobile from "../components/error.pay";
import MobileLoading from "../components/loading";
import { RequestWebhookDto } from "../dto/authorization.dto";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import pino from "pino";
import { useAuthorizationMutation } from "../composable/use.niubiz";

const logger = pino();

export default function Success() {
  const [transactionData, setTransactionData] =
    useState<TransactionState | null>(null);
  const searchParams = useSearchParams();
  const transactionToken = searchParams.get("transactionToken") ?? "";
  const purchaseNumber = Number(searchParams.get("purchaseNumber")) ?? "";
  const amount = Number(searchParams.get("amount")) || 0;

  const { clientId, name, clearClientData } = useClienteStore();
  const { onHandleAuthorization } = useAuthorizationMutation();

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

      logger.info(`Request `, request);

      try {
        const res = (await onHandleAuthorization(
          request
        )) as ResponseTransaction;
        setTransactionData({
          status: "success",
          data: res.result,
          client: res.client,
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setTransactionData({
            status: "error",
            error: error.response.data as ErrorTransaction,
          });
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
            client={transactionData.client}
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
