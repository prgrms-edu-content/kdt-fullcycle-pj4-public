import axios from "axios";
import { API_BASE_URL } from "@/settings";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
});
