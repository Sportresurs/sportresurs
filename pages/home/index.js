import About from "../../components/About";
import TopCourts from "../../components/TopCourts";
import { Grid } from "../../components/Grid";
import styles from "./Home.module.scss";
import SearchSection from "../../components/SearchSection";
import News from "../../components/News";

export default function Home({ topPlaygrounds }) {
  return (
    <div className={styles.background}>
      <Grid>
        <SearchSection />
        {topPlaygrounds && <TopCourts courtList={topPlaygrounds} />}
        <About />
        <News />
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/areas`);
  const data = await res.json();
  const topPlaygrounds = data.areas.filter((el) => el.featured);
  return {
    props: {
      topPlaygrounds,
    },
  };
}
