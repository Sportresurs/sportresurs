import * as Sentry from "@sentry/nextjs";
import { Provider } from "next-auth/client";
import Layout from "../components/layout";
import Error from "../components/Error";
import { ContextProvider } from "../context";
import "../styles/base.scss";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  console.log("TEST DEPLOY", null);

  return (
    <>
      <Provider session={pageProps.session}>
        <ContextProvider>
          <div id="portal"></div>
          {getLayout(<Component {...pageProps} />)}
        </ContextProvider>
      </Provider>
    </>
  );
}

export default Sentry.withErrorBoundary(MyApp, {
  fallback: <Error />,
});
