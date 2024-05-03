import { httpClient } from "@/utils/http";
import { Note } from "@/types/note";

export async function fetchNote(id: number) {
  const { data } = await httpClient.get<Note>(`/notes/${id}`);
  return data;
}
