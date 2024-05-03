import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FetchNotesResponse } from "@/apis/fetchNotes";
import { createNote } from "@/apis/createNote";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      queryClient.setQueryData(["notes"], (notes: FetchNotesResponse) => [newNote, ...notes]);
    },
  });

  return { createNote: createNoteMutation.mutateAsync };
};
