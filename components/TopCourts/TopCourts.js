import s from "./TopCourts.module.scss";
import CourtCard from "../CourtCard";
import Slider from "../Slider";

export default function TopCourts({ courtList }) {
  return (
    <section className={s.topCourts}>
      <h2 className={s.title}>Наші найкращі майданчики</h2>
      <div className={s.wrapper}>
        <ul className={s.list}>
          <Slider
            slidesToShow={courtList.length}
            slidesToScroll={1}
            isInfinite={true}
            withArrows={false}
            isModal={false}
            isAutoplay={true}
            arrayLength={courtList.length}
            classNameBox={s.topCourtsSlider}
            responsive={[
              {
                breakpoint: 1150,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 630,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {courtList.map((court) => (
              <li key={court.id} className={s.listItem}>
                <CourtCard courtInfo={court} />
              </li>
            ))}
          </Slider>
        </ul>
      </div>
    </section>
  );
}
