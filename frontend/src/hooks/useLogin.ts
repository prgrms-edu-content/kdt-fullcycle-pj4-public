import { isAxiosError } from "axios";
import { to } from "await-to-js";
import { useMutation } from "@tanstack/react-query";
import { LoginParams, requestLogin } from "@/apis/requestLogin";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: async (params: LoginParams) => {
      const [error] = await to(requestLogin(params));
      if (isAxiosError(error) && error.response?.status === 401) {
        return { result: "unauthorized" as const };
      }
      if (error) {
        throw error;
      }
      return { result: "success" as const };
    },
  });

  return { login: loginMutation.mutateAsync };
};
