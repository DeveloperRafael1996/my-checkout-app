import { useMutation, useQuery } from "@tanstack/react-query";
import { Security } from "../dto/security.dto";
import PayService from "../services/pay.services";
import { RequestSessionDto, SessionResponse } from "../dto/sesion.dto";
import { ErrorTransaction, ResponseTransaction } from "../dto/transaction.dto";
import { RequestWebhookDto } from "../dto/authorization.dto";
import { DecryptUrl, DecryptUrlResponse } from "../dto/decry.dto";

export const useToken = () => {
  const { data, error, isLoading, isError, refetch } = useQuery<Security>({
    queryKey: ["getToken"],
    queryFn: () => PayService.apitoken(),
  });

  return { data, error, isLoading, isError, refetch };
};

export const useSessionMutation = () => {
  const mutation = useMutation<SessionResponse, Error, RequestSessionDto>({
    mutationFn: async (request: RequestSessionDto) => {
      const response = await PayService.apiSession(request);
      return response;
    },
  });

  return {
    mutate: mutation.mutate,
    onHandleSession: mutation.mutateAsync,
  };
};

export const useAuthorizationMutation = () => {
  const mutation = useMutation<
    ResponseTransaction | ErrorTransaction,
    Error,
    RequestWebhookDto
  >({
    mutationFn: async (request: RequestWebhookDto) => {
      const response = await PayService.apiauthorization(request);
      return response;
    },
  });

  return {
    onHandleAuthorization: mutation.mutateAsync,
  };
};

export const useDecryptUrlMutation = () => {
  const mutation = useMutation<DecryptUrlResponse, Error, DecryptUrl>({
    mutationFn: async (request: DecryptUrl) => {
      const response = await PayService.decryptUrl(request);
      return response;
    },
  });

  return {
    onHandleDecrypt: mutation.mutateAsync,
  };
};
