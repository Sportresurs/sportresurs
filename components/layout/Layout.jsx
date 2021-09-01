import styles from "./styles.module.scss";
import Footer from "../Footer";

const Layout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.header}></div>
    <main className={styles.content}>{children}</main>
    <div className={styles.footer}>
      <Footer />
    </div>
  </div>
);

export default Layout;
