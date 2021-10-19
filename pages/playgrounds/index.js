import { useState } from "react";
import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import Filters from "../../components/Filters";

export default function Playgrounds({ playgrounds }) {
  const [filteredPlaces, setFilteredPlaces] = useState(playgrounds);

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

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/areas`);
  const data = await res.json();
  return {
    props: {
      playgrounds: data.areas,
    },
  };
}
