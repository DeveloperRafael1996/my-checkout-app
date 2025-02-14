import { AuthorizationData } from "../dto/authorization.dto";
import { ErrorTransaction, Transaction } from "../dto/transaction.dto";
import { http } from "../http/enpoint";

class NiunizService {
  static async apiauthorization(
    data: AuthorizationData
  ): Promise<Transaction | ErrorTransaction> {
    //Get Token API NestJS

    const response = await http.post(
      "/api.authorization/v3/authorization/ecommerce/456879852",
      data,
      {
        headers: {
          Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwTWR3R0R6RjQ1YS1SbWs3bkhwc2lNYUJweFJQRjNzekEtNW1HWFllMThvIn0.eyJleHAiOjE3Mzk1MjAwMjIsImlhdCI6MTczOTUxNjQyMiwianRpIjoiMjFhMjRlNjEtYzkwNy00YzU5LTg0NzctMzViMmM2YzFkMjg2IiwiaXNzIjoiaHR0cHM6Ly9hY2Nlc3MuaW50dm50LmNvbS9hdXRoL3JlYWxtcy9vbmxpbmUtYXBpcyIsInN1YiI6IjQyNjg5NzZlLWVhOWEtNDI0Yi04YWEwLTY5ZWYwMjA5NTJkZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwcC1tdWx0aXJlZ2lvbiIsInNlc3Npb25fc3RhdGUiOiJkMGRiYzJmYS00OTQyLTQxMDktOWJlMy1mNzYzYzAxMjY0ZmEiLCJhY3IiOiIxIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImdyb3VwcyI6W10sInVzZXJuYW1lIjoiaW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlIn0.BMa_GFdN8FaVr3yh9Sz4b4LWfJrPvKbrGfdCqYbaJt7Rqb7IayvaGFLVWCm6nZuVD_ol_lPbzc9uba8DS2umIeLfcbvkOzz0RDr1j2kg-B_1kKlr4YUGyRsbp2wPa6fQcN7WvUESTnzsWjVmtkNLnuP4BSVC5sjwECjFS5gHJCHvRju7uH81UR8FXuoyPJIfx16cNE1dfD4R2vfiE5FQeLpsMfE_HgEQNIMB0TbcqB8FxiM9oTr3yQPgFlbUQP3SMcrqDNJcClla_aL66bUGeMxhqPbY349PiNpmG55Zu2d0lYdfjo3MZKOpWEcUQhAQvp1k3Y1B2kUaKOMgG0mlxA",
        },
      }
    );
    return response.data;
  }
}

export default NiunizService;
