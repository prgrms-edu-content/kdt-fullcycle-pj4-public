import { httpClient } from "@/utils/http";
import { Note } from "@/types/note";

export interface CreateNoteParams {
  title: string;
  content: string;
}

export async function createNote(params: CreateNoteParams) {
  const { data } = await httpClient.post<Note>(`/notes`, params);
  return data;
}
