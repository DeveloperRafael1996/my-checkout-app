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
          Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwTWR3R0R6RjQ1YS1SbWs3bkhwc2lNYUJweFJQRjNzekEtNW1HWFllMThvIn0.eyJleHAiOjE3Mzk1NTc0MzcsImlhdCI6MTczOTU1MzgzNywianRpIjoiNmU0Y2QwZDYtODQwOS00MTgxLWI4YWItMjBjYmUyMDNkN2Q0IiwiaXNzIjoiaHR0cHM6Ly9hY2Nlc3MuaW50dm50LmNvbS9hdXRoL3JlYWxtcy9vbmxpbmUtYXBpcyIsInN1YiI6IjQyNjg5NzZlLWVhOWEtNDI0Yi04YWEwLTY5ZWYwMjA5NTJkZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwcC1tdWx0aXJlZ2lvbiIsInNlc3Npb25fc3RhdGUiOiJjYTZhMjllYi05NmMyLTQyNTMtYWY0Yy02MGE0NmYwZTMxNjUiLCJhY3IiOiIxIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImdyb3VwcyI6W10sInVzZXJuYW1lIjoiaW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlIn0.ZMbA7ISxNsY_6luUptEPTKQKKLaHMQRAru9FZ8vVKhZBPNJefLJtZbT7AzwqAWzrMdn6Vtli8X12vIb4RaiyllJcOWGz_J9a7mWxbFdRAeFBJuJo2R5UVwDByfGhD31fjFhM8THzYcw3Sd_gdZh5pg300n8DuEYve4vb47ksTRKkvl4dXoVPdW_WKyf6MerLo5UKV9xqjSD60VMkEOrSMdjp6U3EOAw3nhZtNzALjLn_iplRWEQhcWlN4hOvIx0zU0K0PmufI7_gZjXjbVFBVgSlz1BPYh5Kje6v8FVmNrKtC1Paml5mooyhf6emEaOhDNkulbEJ1HRDwgJMuvYv8Q",
        },
      }
    );
    return response.data;
  }
}

export default NiunizService;
