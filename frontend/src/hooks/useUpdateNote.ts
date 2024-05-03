import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FetchNotesResponse } from "@/apis/fetchNotes";
import { updateNote } from "@/apis/updateNote";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (updatedNote) => {
      queryClient.setQueryData(["notes"], (notes: FetchNotesResponse) =>
        notes.map((note) => (note.id === updatedNote.id ? { ...note, ...updatedNote } : note))
      );
      queryClient.setQueryData(["note", updatedNote.id], () => updatedNote);
    },
  });

  return { updateNote: updateNoteMutation.mutateAsync };
};
