import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import Filters from "../../components/Filters";
import image from "../../public/img/playgroundPlaceholder.png";

export default function Playgrounds({ playgrounds }) {
  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          <Filters />
          <ul className={s.list}>
            {playgrounds.map((court) => {
              // eslint-disable-next-line no-param-reassign
              court.images = [image, image, image, image]; // temporary measure while waiting for DB with images, now it's doesn't exsist
              return (
                <li key={court.id} className={s.listItem}>
                  <CourtCard courtInfo={court} variant="courtList" />
                </li>
              );
            })}
          </ul>
        </Grid>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.HOST}api/areas`);
  const data = await res.json();
  return {
    props: {
      playgrounds: data.areas,
    },
  };
}
