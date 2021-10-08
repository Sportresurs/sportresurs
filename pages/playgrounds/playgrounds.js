import { useState, useContext } from "react";
import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import Filters from "../../components/Filters";
import { Context } from "../../context";

export default function Playgrounds() {
  const { areas } = useContext(Context);
  const [filteredPlaces, setFilteredPlaces] = useState(areas);

  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          <Filters setAreas={setFilteredPlaces} />
          <ul className={s.list}>
            {filteredPlaces.map((court) => (
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
