import { useContext } from "react";
import { Context } from "../context";
import s from "../styles/Playgrounds.module.scss";
import CourtCard from "../components/CourtCard";
import { Grid } from "../components/Grid";
import data from "../utils/testData/testArrs";

export default function Playgrounds() {
  const { coordinates } = useContext(Context);

  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          {coordinates && (
            <div>
              <p>Lat{coordinates.lat}</p>
            </div>
          )}
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
    </div>
  );
}
