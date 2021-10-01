import styles from "./Layout.module.scss";
import Footer from "../Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <Header />
    </div>
    <main className={styles.content}>{children}</main>
    <div className={styles.footer}>
      <Footer />
    </div>
  </div>
);

export default Layout;
