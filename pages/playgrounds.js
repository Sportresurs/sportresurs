import { useContext, useEffect } from "react";
import { Context } from "../context";
import s from "../styles/Playgrounds.module.scss";
import CourtCard from "../components/CourtCard";
import { Grid } from "../components/Grid";
import data from "../utils/testData/testArrs";

export default function Playgrounds() {
  const { coordinates, handleCoordinates } = useContext(Context);

  useEffect(() => () => handleCoordinates(null), []);
  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          {coordinates && (
            <div>
              Coord from app Context
              <p>{coordinates.lat}</p>
              <p>{coordinates.lng}</p>
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
