import { RequestWebhookDto } from "../dto/authorization.dto";
import { DecryptUrl, DecryptUrlResponse } from "../dto/decry.dto";
import { Security } from "../dto/security.dto";
import { RequestSessionDto, SessionResponse } from "../dto/sesion.dto";
import { TransactionResponse } from "../dto/transaction.dto";
import { http_pay } from "../http/enpoint";

class PayService {
  static async apitoken(): Promise<Security> {
    const response = await http_pay.get("/payment/v1/security");
    return response.data;
  }

  static async apiSession(
    request: RequestSessionDto
  ): Promise<SessionResponse> {
    const response = await http_pay.post("/payment/v1/session", request);
    return response.data;
  }

  static async apiauthorization(
    data: RequestWebhookDto
  ): Promise<TransactionResponse> {
    const { token } = await this.apitoken();
    
      const response = await http_pay.post("/payment/v1/authorization", data, {
        headers: {
          Authorization: `${token}`,
        },
      });
    
      return response.data;
  }

  static async decryptUrl(request: DecryptUrl): Promise<DecryptUrlResponse> {
    const response = await http_pay.post("/encrypt/v1/decrypt-url", request);
    return response.data;
  }
}

export default PayService;
