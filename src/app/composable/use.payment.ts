import { useQuery } from "@tanstack/react-query";
import { Security } from "../dto/security.dto";
import PayService from "../services/pay.services";
import { SessionResponse } from "../dto/sesion.dto";

export const useToken = () => {
  const { data, error, isLoading, isError, refetch } = useQuery<Security>({
    queryKey: ["getToken"],
    queryFn: () => PayService.apitoken(),
  });

  return { data, error, isLoading, isError, refetch };
};

export const useSession = () => {
  const { data, error, isLoading, isError, refetch } =
    useQuery<SessionResponse>({
      queryKey: ["getSession"],
      queryFn: () => PayService.apiSession(),
    });

  return { ...data, error, isLoading, isError, refetch };
};
