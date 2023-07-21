import * as Sentry from "@sentry/nextjs";
import { Provider } from "next-auth/client";
import Head from "next/head";
import Layout from "../components/layout";
import Error from "../components/Error";
import { ContextProvider } from "../context";
import "../styles/base.scss";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Provider session={pageProps.session}>
        <ContextProvider>
          <Head>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="icon" type="image/png" href="/favicon.png" />
          </Head>
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
