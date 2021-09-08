import s from "./News.module.scss";
import NewsCard from "../NewsCard";
import { Grid } from "../grid/Grid";

export default function News() {
  return (
    <Grid>
      <section className={s.newsList}>
        <h2 className={s.title}>Новини</h2>
        <div className={s.container}>
          <ul className={s.list}>
            <li>
              <NewsCard />
            </li>
            <li>
              <NewsCard />
            </li>
            <li>
              <NewsCard />
            </li>
          </ul>
        </div>
      </section>
    </Grid>
  );
}