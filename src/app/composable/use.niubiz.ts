import { useMutation } from "@tanstack/react-query";
import { ErrorTransaction, Transaction } from "../dto/transaction.dto";
import { AuthorizationData } from "../dto/authorization.dto";
import NiunizService from "../services/niubiz.services";

export const useAuthorizationMutation = () => {
  const mutation = useMutation<
    Transaction | ErrorTransaction,
    Error,
    AuthorizationData
  >({
    mutationFn: async (request: AuthorizationData) => {
      const response = await NiunizService.apiauthorization(request);
      return response;
    },
  });

  return {
    mutate: mutation.mutate,
    onHandleAuthorization: mutation.mutateAsync,
  };
};
