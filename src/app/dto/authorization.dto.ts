type Order = {
  amount: number;
  currency: string;
  purchaseNumber: number;
  tokenId: string;
};

type DataMap = {
  urlAddress: string;
  partnerIdCode: string;
  serviceLocationCityName: string;
  serviceLocationCountrySubdivisionCode: string;
  serviceLocationCountryCode: string;
  serviceLocationPostalCode: string;
};

export type AuthorizationData = {
  captureType: "manual";
  channel: "web";
  countable: boolean;
  order: Order;
  dataMap: DataMap;
};

export type RequestWebhookDto = {
  tokenId: AuthorizationData["order"]["tokenId"];
  purchaseNumber: AuthorizationData["order"]["purchaseNumber"];
  amount: AuthorizationData["order"]["amount"];
  clientId: number;
  name: string;
};
