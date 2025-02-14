import pino from "pino";
import { AuthorizationData } from "../dto/authorization.dto";
import { ErrorTransaction, Transaction } from "../dto/transaction.dto";
import { http } from "../http/enpoint";
import PayService from "./pay.services";

class NiubizService {
  static async apiauthorization(
    data: AuthorizationData
  ): Promise<Transaction | ErrorTransaction> {
    const logger = pino();

    const { token } = await PayService.apitoken();
    logger.info(token);

    const response = await http.post(
      "/api.authorization/v3/authorization/ecommerce/456879852",
      data,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  }
}

export default NiubizService;
