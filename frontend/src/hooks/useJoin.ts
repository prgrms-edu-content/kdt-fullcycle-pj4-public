import { isAxiosError } from "axios";
import { to } from "await-to-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JoinParams, requestJoin } from "@/apis/requestJoin";

export const useJoin = () => {
  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: async (params: JoinParams) => {
      const [error] = await to(requestJoin(params));
      if (isAxiosError(error) && error.response?.status === 409) {
        return { result: "conflict" as const };
      }
      if (error) {
        throw error;
      }
      return { result: "success" as const };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return { join: joinMutation.mutateAsync };
};
