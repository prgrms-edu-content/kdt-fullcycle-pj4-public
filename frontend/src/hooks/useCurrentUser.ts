import { isAxiosError } from "axios";
import { to } from "await-to-js";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/apis/fetchCurrentUser";

export const useCurrentUser = () => {
  const currentUserQuery = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const [error, data] = await to(fetchCurrentUser());
      if (isAxiosError(error) && error.response?.status === 401) {
        return "unauthenticated" as const;
      }
      if (error) {
        throw error;
      }
      return data;
    },
  });

  return { currentUser: currentUserQuery.data };
};
