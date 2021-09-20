/* import * as Sentry from "@sentry/nextjs";
import { useState } from "react";
import Layout from "../components/layout";
import Context from "../context";
import "../styles/base.scss";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const [coordinates, setCoordinates] = useState(null);

  return (
    <>
      <Context.Provider value={{ coordinates, setCoordinates }}>
        <div id="portal"></div>
        {getLayout(<Component {...pageProps} />)}
      </Context.Provider>
    </>
  );
}

export default Sentry.withErrorBoundary(MyApp, {
  fallback: (
    <p>
      Йой! На цій сторінці сталася помилка. Обновіть сторінку або зверніться до{" "}
      <a href="mailto:rostzelik@gmail.com">підтримки</a>.
    </p>
  ),
}); */

import * as Sentry from "@sentry/nextjs";
import Layout from "../components/layout";
import { ContextProvider } from "../context/context";
import "../styles/base.scss";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <ContextProvider>
        <div id="portal"></div>
        {getLayout(<Component {...pageProps} />)}
      </ContextProvider>
    </>
  );
}

export default Sentry.withErrorBoundary(MyApp, {
  fallback: (
    <p>
      Йой! На цій сторінці сталася помилка. Обновіть сторінку або зверніться до{" "}
      <a href="mailto:rostzelik@gmail.com">підтримки</a>.
    </p>
  ),
});
