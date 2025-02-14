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
          Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwTWR3R0R6RjQ1YS1SbWs3bkhwc2lNYUJweFJQRjNzekEtNW1HWFllMThvIn0.eyJleHAiOjE3Mzk1NTg1NDIsImlhdCI6MTczOTU1NDk0MiwianRpIjoiZTNkNTNjOWYtYmJkNC00M2E5LTk3ZGQtMWU5ZWNhY2FjOTgwIiwiaXNzIjoiaHR0cHM6Ly9hY2Nlc3MuaW50dm50LmNvbS9hdXRoL3JlYWxtcy9vbmxpbmUtYXBpcyIsInN1YiI6IjQyNjg5NzZlLWVhOWEtNDI0Yi04YWEwLTY5ZWYwMjA5NTJkZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwcC1tdWx0aXJlZ2lvbiIsInNlc3Npb25fc3RhdGUiOiI5YTI2ZGYzOS00NDI1LTRlODgtYWY2Ny01MDkyZDZhZjZjNjAiLCJhY3IiOiIxIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImdyb3VwcyI6W10sInVzZXJuYW1lIjoiaW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlIn0.aeZsXRAuti4LdU0U6XWu4ylyO7a8L5_5RJZ9IxCXUHABaNixarMexDNFmohsNwpuVbhufkiT4baB_fX_SgIni3aSXbFC9lHJriK7EUZaTt0rIMFXyQLyy0LPmzT_CsY_DEGEpAJa8ap1t9gKM-Ll5yWdbqukdpZcHV-Pt0xyCgzxFevHOTDq0FKgEmSYH4g4cD7Qjp7mquCflttrL31iKmzGU1hta2-n-9EpbSHJ4CzymyYn_R6AVNrlSg2gPP_HHaUbFYUxhjVRpuQ8OjDAYgMUpE1uPbmvvDMYIQRNWzGkb0BA6d1wUpc21Kepx8it4GdetEbKqW1yzk7tui3Wig",
        },
      }
    );
    return response.data;
  }
}

export default NiunizService;
