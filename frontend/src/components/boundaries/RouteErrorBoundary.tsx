import { useRouteError } from "react-router-dom";
import { ErrorPage } from "@/pages/Error";

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();

  return <ErrorPage error={error} />;
};
