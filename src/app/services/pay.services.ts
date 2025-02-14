import { Security } from "../dto/security.dto";
import { http_pay } from "../http/enpoint";

class PayService {
  static async apitoken(): Promise<Security> {
    const response = await http_pay.get("/payment/v1/security");
    return response.data;
  }
}

export default PayService;
