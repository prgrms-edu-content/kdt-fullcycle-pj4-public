import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestLogout } from "@/apis/requestLogout";

export const useLogout = () => {
  const logoutMutation = useMutation({
    mutationFn: requestLogout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  const queryClient = useQueryClient();

  return { logout: logoutMutation.mutateAsync };
};
