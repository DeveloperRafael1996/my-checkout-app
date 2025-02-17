export type SessionResponse = {
  sessionKey: string;
  expirationTime: number;
};

export type RequestSessionDto = {
  amount: number;
  clientId: string;
  email: string;
};
