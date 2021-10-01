import { useEffect, useState } from "react";
import axios from "axios";
import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import Filters from "../../components/Filters";

export default function Playgrounds() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/areas",
    }).then(({ data }) => setAreas(data.areas));
  }, []);

  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          <Filters setAreas={setAreas} />
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
