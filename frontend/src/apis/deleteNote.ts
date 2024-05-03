import { httpClient } from "@/utils/http";

export async function deleteNote(id: number) {
  await httpClient.delete(`/notes/${id}`);
}
