import s from "./TopCourts.module.scss";
import CourtCard from "../CourtCard";
import { Grid } from "../grid/Grid";

export default function TopCourts({ courtList }) {
  return (
    <Grid>
      <section className={s.topCourts}>
        <h2 className={s.title}>Наші найкращі майданчики</h2>
        <div className={s.wrapper}>
          <ul className={s.list}>
            {courtList.map((court) => (
              <li key={court.id} className={s.listItem}>
                <CourtCard courtInfo={court} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Grid>
  );
}
