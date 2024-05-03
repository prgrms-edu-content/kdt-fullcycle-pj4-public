import { useQuery } from "@tanstack/react-query";
import { fetchNote } from "@/apis/fetchNote";

export const useNote = (noteId: number) => {
  const noteQuery = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
    enabled: !!noteId,
  });

  return { note: noteQuery.data };
};
