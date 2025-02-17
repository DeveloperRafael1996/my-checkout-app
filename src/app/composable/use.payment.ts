import { useMutation, useQuery } from "@tanstack/react-query";
import { Security } from "../dto/security.dto";
import PayService from "../services/pay.services";
import { RequestSessionDto, SessionResponse } from "../dto/sesion.dto";
import { ErrorTransaction, Transaction } from "../dto/transaction.dto";
import { RequestWebhookDto } from "../dto/authorization.dto";

export const useToken = () => {
  const { data, error, isLoading, isError, refetch } = useQuery<Security>({
    queryKey: ["getToken"],
    queryFn: () => PayService.apitoken(),
  });

  return { data, error, isLoading, isError, refetch };
};

export const useSession = (request: RequestSessionDto) => {
  const { data, error, isLoading, isError, refetch } =
    useQuery<SessionResponse>({
      queryKey: ["getSession"],
      queryFn: () => PayService.apiSession(request),
    });

  return { ...data, error, isLoading, isError, refetch };
};

export const useAuthorizationMutation = () => {
  const mutation = useMutation<
    Transaction | ErrorTransaction,
    Error,
    RequestWebhookDto
  >({
    mutationFn: async (request: RequestWebhookDto) => {
      const response = await PayService.apiauthorization(request);
      return response;
    },
  });

  return {
    mutate: mutation.mutate,
    onHandleAuthorization: mutation.mutateAsync,
  };
};
