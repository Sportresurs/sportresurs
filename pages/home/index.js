import About from "../../components/About";
import TopCourts from "../../components/TopCourts";
import { Grid } from "../../components/Grid";
import SearchSection from "../../components/SearchSection";
import News from "../../components/News";
import topPlaygrounds from "../../utils/topPlaygrounds";
import styles from "./Home.module.scss";
import AdminPlaygroundModal from "../../components/AdminPlaygroundModal";

export default function Home() {
  return (
    <div className={styles.background}>
      <Grid>
        <SearchSection />
        <TopCourts courtList={topPlaygrounds} />
        <AdminPlaygroundModal visible={true} />
        <About />
        <News />
      </Grid>
    </div>
  );
}
