export type DecryptUrl = {
  data: string;
  iv: string;
};

export type DecryptUrlResponse = {
  amount: number;
  purchaseNumber: number;
  customerId: number;
  clientMail: string;
  name: string;
  document_number: string;
  phone_number: string;
  createdAt: string;
};

type DecryptedData = {
  amount: number;
  purchaseNumber: number;
  customerId: number;
  clientMail: string;
  name: string;
  document_number: string;
  phone_number: string;
  createdAt: string;
};

type SessionResponse = {
  sessionKey: string;
  expirationTime: number;
};

export type DecryptUrlSessionResponse = {
  data: DecryptedData;
  session: SessionResponse;
};
