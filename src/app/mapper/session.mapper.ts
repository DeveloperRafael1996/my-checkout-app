import { DecryptUrlResponse } from "../dto/decry.dto";
import { RequestSessionDto } from "../dto/sesion.dto";

export function mapperSession(request: DecryptUrlResponse): RequestSessionDto {
  return {
    amount: request.amount,
    clientId: request.customerId,
    email: request.clientMail,
  };
}
