export type Transaction = {
  header: {
    ecoreTransactionUUID: string;
    ecoreTransactionDate: number;
    millis: number;
  };
  fulfillment: {
    channel: string;
    merchantId: string;
    terminalId: string;
    captureType: string;
    countable: boolean;
    fastPayment: boolean;
    signature: string;
  };
  order: {
    tokenId: string;
    purchaseNumber: string;
    amount: number;
    installment: number;
    currency: string;
    authorizedAmount: number;
    authorizationCode: string;
    actionCode: string;
    traceNumber: string;
    transactionDate: string;
    transactionId: string;
  };
  dataMap: {
    TERMINAL: string;
    BRAND_ACTION_CODE: string;
    BRAND_HOST_DATE_TIME: string;
    TRACE_NUMBER: string;
    CARD_TYPE: string;
    ECI_DESCRIPTION: string;
    SIGNATURE: string;
    CARD: string;
    MERCHANT: string;
    STATUS: string;
    INSTALLMENTS_INFO: string;
    ACTION_DESCRIPTION: string;
    ID_UNICO: string;
    AMOUNT: string;
    BRAND_HOST_ID: string;
    AUTHORIZATION_CODE: string;
    YAPE_ID: string;
    CURRENCY: string;
    TRANSACTION_DATE: string;
    ACTION_CODE: string;
    CVV2_VALIDATION_RESULT: string;
    ECI: string;
    ID_RESOLUTOR: string;
    BRAND: string;
    ADQUIRENTE: string;
    QUOTA_AMOUNT: string;
    BRAND_NAME: string;
    PROCESS_CODE: string;
    TRANSACTION_ID: string;
  };
};

export type ErrorTransaction = {
  errorCode: number;
  errorMessage: string;
  header: {
    ecoreTransactionUUID: string;
    ecoreTransactionDate: number;
    millis: number;
  };
  data: {
    CURRENCY: string;
    TERMINAL: string;
    TRANSACTION_DATE: string;
    BRAND_ACTION_CODE: string;
    BRAND_HOST_DATE_TIME: string;
    ACTION_CODE: string;
    TRACE_NUMBER: string;
    CVV2_VALIDATION_RESULT: string;
    CARD_TYPE: string;
    ECI_DESCRIPTION: string;
    ECI: string;
    SIGNATURE: string;
    CARD: string;
    MERCHANT: string;
    BRAND: string;
    STATUS: string;
    ACTION_DESCRIPTION: string;
    ADQUIRENTE: string;
    ID_UNICO: string;
    AMOUNT: string;
    BRAND_NAME: string;
    PROCESS_CODE: string;
    BRAND_HOST_ID: string;
    TRANSACTION_ID: string;
  };
};

export type Client = {
  name: string;
  clientId: number;
};

/*
type SimplifiedErrorTransaction = Omit<ErrorTransaction, "header" | "data"> & {
  data: { STATUS: string };
};
*/

export type ResponseTransaction = {
  result: Transaction;
  client: Client;
};

export type TransactionState =
  | { status: "success"; data: Transaction, client: Client }
  | { status: "error"; error: ErrorTransaction };

export type TransactionResponse = Promise<ResponseTransaction | ErrorTransaction>;
