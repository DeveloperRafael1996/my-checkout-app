import { useMutation } from "@tanstack/react-query";
import { ErrorTransaction, ResponseTransaction } from "../dto/transaction.dto";
import { RequestWebhookDto } from "../dto/authorization.dto";
import NiunizService from "../services/niubiz.services";

export const useAuthorizationMutation = () => {
  const mutation = useMutation<
    ResponseTransaction | ErrorTransaction,
    Error,
    RequestWebhookDto
  >({
    mutationFn: async (request: RequestWebhookDto) => {
      const response = await NiunizService.apiauthorization(request);
      return response;
    },
  });

  return {
    mutate: mutation.mutate,
    onHandleAuthorization: mutation.mutateAsync,
  };
};
