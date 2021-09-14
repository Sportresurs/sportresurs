import s from "./TopCourts.module.scss";
import CourtCard from "../CourtCard";

export default function TopCourts({ courtList }) {
  return (
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
  );
}
