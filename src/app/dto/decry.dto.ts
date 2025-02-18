export type DecryptUrl = {
  data: string;
  iv: string;
};

export type DecryptUrlResponse = {
  amount: number;
  purchaseNumber: number;
  customerId: number;
  clientMail: string;
};
