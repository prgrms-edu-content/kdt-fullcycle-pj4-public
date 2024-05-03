import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "@/pages/Error";

export const AppErrorBoundary: React.FC<PropsWithChildren> = (props) => {
  return <ErrorBoundary FallbackComponent={ErrorPage}>{props.children}</ErrorBoundary>;
};
