import s from "../styles/Playgrounds.module.scss";
import CourtCard from "../components/CourtCard";
import { Grid } from "../components/grid/Grid";
import data from "../utils/testData/testArrs";

export default function Playgrounds() {
  return (
    <main className={s.playgrounds}>
      <section className={s.courts}>
        <Grid>
          <h1 className={s.title}>Майданчики</h1>
          <ul className={s.list}>
            {data.playgroundsList.map((court) => (
              <li key={court.id} className={s.listItem}>
                <CourtCard courtInfo={court} variant="courtList" />
              </li>
            ))}
          </ul>

          <div className={s.leftBg}></div>
          <div className={s.rightBg}></div>
        </Grid>
      </section>
    </main>
  );
}
