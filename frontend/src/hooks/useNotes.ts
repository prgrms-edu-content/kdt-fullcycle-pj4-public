import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/apis/fetchNotes";

export const useNotes = () => {
  const notesQuery = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  return { notes: notesQuery.data };
};
