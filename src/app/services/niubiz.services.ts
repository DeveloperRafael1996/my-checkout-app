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
          Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwTWR3R0R6RjQ1YS1SbWs3bkhwc2lNYUJweFJQRjNzekEtNW1HWFllMThvIn0.eyJleHAiOjE3Mzk1NTM3ODksImlhdCI6MTczOTU1MDE4OSwianRpIjoiYjc2Y2NhZjMtYjVhMi00NjZlLWE3MTQtMzMxZGVlMzk3NzFlIiwiaXNzIjoiaHR0cHM6Ly9hY2Nlc3MuaW50dm50LmNvbS9hdXRoL3JlYWxtcy9vbmxpbmUtYXBpcyIsInN1YiI6IjQyNjg5NzZlLWVhOWEtNDI0Yi04YWEwLTY5ZWYwMjA5NTJkZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwcC1tdWx0aXJlZ2lvbiIsInNlc3Npb25fc3RhdGUiOiJkNjY1NGEzZi03NTVhLTQyNmEtYWJhMC0wMDkzNTFlMWE5ZDUiLCJhY3IiOiIxIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImdyb3VwcyI6W10sInVzZXJuYW1lIjoiaW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlIn0.j_ko9Uo7UnitBmTvMCwjWywYaO45KBMHg982htZ3bpii6FbtAZmfVKrFYxo7mLX5tKrdT3a3gt4vcQjpdYtNLvTruFU7vKyBMHMDrbR-nog_BHjSC8eUbmqMOhNZlKf7K-eQE_A2MQ3Mwg9yocJ54a-nz8xq30k_uzNIZP0mLvgzcOKeXsTMQnIVBMRU6vAb7V7paEskna8kmOSuJrl48oJ80G0SsbslSuzTVJo1p5gqN_Wj_JSw8ndaP0XcP5J4H7UUfk0g4fzcY3Y_xB4YzIbJyA9OEmG1j_84udWr3zAC3jrMlg-eKyaAe640zwlUB6sJaG_8QI3RRqJ6g_OpLA",
        },
      }
    );
    return response.data;
  }
}

export default NiunizService;
