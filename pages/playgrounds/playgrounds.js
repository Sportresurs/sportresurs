import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import data from "../../utils/testData/testArrs";
import Filters from "../../components/Filters";

export default function Playgrounds() {
  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          <Filters />
          <ul className={s.list}>
            {data.playgroundsList.map((court) => (
              <li key={court.id} className={s.listItem}>
                <CourtCard courtInfo={court} variant="courtList" />
              </li>
            ))}
          </ul>
        </Grid>
      </section>
    </div>
  );
}
