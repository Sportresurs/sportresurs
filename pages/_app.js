import * as Sentry from "@sentry/nextjs";
import { Provider } from "next-auth/client";
import Layout from "../components/layout";
import Error from "../components/Error";
import "../styles/base.scss";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <>
      <Provider session={pageProps.session}>
        <div id="portal"></div>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  );
}

export default Sentry.withErrorBoundary(MyApp, {
  fallback: <Error />,
});
