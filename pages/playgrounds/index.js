import { useContext } from "react";
import { Context } from "../../context";
import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import Filters from "../../components/Filters";

export default function Playgrounds({ playgrounds }) {
  const { areas } = useContext(Context);

  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          <Filters areas={playgrounds} />
          <ul className={s.list}>
            {areas.map((court) => (
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
