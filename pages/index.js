import About from "../components/About";
import TopCourts from "../components/TopCourts";
import { Grid } from "../components/Grid";
import styles from "./home/Home.module.scss";
import SearchSection from "../components/SearchSection";
import News from "../components/News";

export default function Home({ topPlaygrounds, districts }) {
  return (
    <div className={styles.background}>
      <Grid>
        <SearchSection districts={districts} />
        {topPlaygrounds && <TopCourts courtList={topPlaygrounds} />}
        <About />
        <News />
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const areasResponse = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/areas/top-playgrounds`
    );

    const districtsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/district`
    );

    const { areas } = await areasResponse.json();
    const { districts } = await districtsResponse.json();

    return {
      props: {
        topPlaygrounds: areas,
        districts,
      },
    };
  } catch (error) {
    throw new Error(`Problem fetch home page content ${error}`);
  }
}
