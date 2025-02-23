import { DecryptUrlResponse } from "../dto/decry.dto";
import { decryptUrlSession } from "./payment-setup.action";

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
  const { data: bodyPay, session } = await decryptUrlSession({
    data,
    iv,
  });

  /*
  const decryptResponse = await decryptUrl({
    data,
    iv,
  });

  const requestSession = mapperSession(decryptResponse);
  const { sessionKey } = await apiSession(requestSession);

  */

  return {
    bodyPay,
    sessionKey: session.sessionKey,
  };
};
