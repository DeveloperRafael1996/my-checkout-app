import { RequestWebhookDto } from "../dto/authorization.dto";
import { ErrorTransaction, Transaction } from "../dto/transaction.dto";
import { http_pay } from "../http/enpoint";

class NiubizService {
  static async apiauthorization(
    data: RequestWebhookDto
  ): Promise<Transaction | ErrorTransaction> {
    const response = await http_pay.post("/payment/v1/authorization", data);
    return response.data;
  }
}

export default NiubizService;
