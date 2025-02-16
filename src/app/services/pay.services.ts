import { RequestWebhookDto } from "../dto/authorization.dto";
import { Security } from "../dto/security.dto";
import { SessionResponse } from "../dto/sesion.dto";
import { TransactionResponse } from "../dto/transaction.dto";
import { http_pay } from "../http/enpoint";

class PayService {
  static async apitoken(): Promise<Security> {
    const response = await http_pay.get("/payment/v1/security");
    return response.data;
  }

  static async apiSession(): Promise<SessionResponse> {
    const response = await http_pay.get("/payment/v1/session");
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
}

export default PayService;
