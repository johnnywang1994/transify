import { Layout } from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";

const DevLayout = (props: any) => (
  <>
    <Layout {...props} />
    <ReactQueryDevtools initialIsOpen={false} />
  </>
);

export default DevLayout;
