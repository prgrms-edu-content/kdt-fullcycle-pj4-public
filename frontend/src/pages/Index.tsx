import { withUnauthenticated } from "@/components/hocs/withUnauthenticated";
import { IndexTemplate } from "./Index.template";

export const IndexPage = withUnauthenticated(() => {
  return <IndexTemplate />;
});
