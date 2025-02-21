import { DecryptUrlResponse } from "../dto/decry.dto";
import { mapperSession } from "../mapper/session.mapper";
import { apiSession, decryptUrl } from "./payment-setup.action";

interface InitPaymentOptions {
  data: string;
  iv: string;
}

interface InitPaymentResponse {
  bodyPay: DecryptUrlResponse;
  sessionKey: string;
}

export const initPaymentConfiguration = async ({
  data,
  iv,
}: InitPaymentOptions): Promise<InitPaymentResponse> => {
  const decryptResponse = await decryptUrl({
    data,
    iv,
  });

  const requestSession = mapperSession(decryptResponse);
  console.log(`Request `, { requestSession });
  const { sessionKey } = await apiSession(requestSession);

  return {
    bodyPay: decryptResponse,
    sessionKey,
  };
};
