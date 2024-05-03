import { httpClient } from "@/utils/http";
import { Note } from "@/types/note";

export type FetchNotesResponse = Omit<Note, "content">[];

export async function fetchNotes() {
  const { data } = await httpClient.get<FetchNotesResponse>("/notes");
  return data;
}
