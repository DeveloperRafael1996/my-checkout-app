import { RequestWebhookDto } from "../dto/authorization.dto";
import { ErrorTransaction, ResponseTransaction } from "../dto/transaction.dto";
import { http_pay } from "../http/enpoint";

class NiubizService {
  static async apiauthorization(
    data: RequestWebhookDto
  ): Promise<ResponseTransaction | ErrorTransaction> {
    const response = await http_pay.post("/payment/v1/authorization", data);
    return response.data;
  }
}

export default NiubizService;
