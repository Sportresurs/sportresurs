import s from "../styles/Playgrounds.module.scss";
import CourtCard from "../components/CourtCard";
import { Grid } from "../components/grid/Grid";
import data from "../utils/testData/testArrs";
import Background from "../components/Background";

export default function Playgrounds() {
  return (
    <>
      <section className={s.courts}>
        <Background variant="playgroundsPage" />
        <Grid>
          <h1 className={s.title}>Майданчики</h1>
          <ul className={s.list}>
            {data.playgroundsList.map((court) => (
              <li key={court.id} className={s.listItem}>
                <CourtCard courtInfo={court} variant="courtList" />
              </li>
            ))}
          </ul>
        </Grid>
      </section>
    </>
  );
}
