import { useContext } from "react";
import { Context } from "../../context";
import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import Filters from "../../components/Filters";
import RouteGuard from "../../components/RouteGuard";

export default function Playgrounds({ playgrounds }) {
  const { areas } = useContext(Context);

  return (
    <RouteGuard>
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
    </RouteGuard>
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
