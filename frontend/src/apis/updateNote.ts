import { httpClient } from "@/utils/http";
import { Note } from "@/types/note";

export interface UpdateNoteParams {
  id: number;
  title: string;
  content: string;
}

export async function updateNote({ id, ...params }: UpdateNoteParams) {
  const { data } = await httpClient.put<Note>(`/notes/${id}`, params);
  return data;
}
