import { httpClient } from "@/utils/http";

export interface JoinParams {
  email: string;
  password: string;
}

export async function requestJoin(params: JoinParams) {
  await httpClient.post("/users", params);
}
