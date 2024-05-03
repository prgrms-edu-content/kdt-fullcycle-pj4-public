import { isRouteErrorResponse } from "react-router-dom";
import { isAxiosError } from "axios";

export function getStatusFromError(error: unknown) {
  let errorStatus: number | null = null;
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
  }
  if (isAxiosError(error) && error.response) {
    errorStatus = error.response.status;
  }

  return errorStatus;
}
