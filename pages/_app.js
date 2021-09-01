import Layout from "../components/layout";
import "../styles/base.scss";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
