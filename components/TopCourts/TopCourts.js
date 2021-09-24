import s from "./TopCourts.module.scss";
import CourtCard from "../CourtCard";
import Slider from "../Slider";
import useWindowSize from "../../utils/hooks/findWindowSize";

export default function TopCourts({ courtList }) {
  const size = useWindowSize();

  return (
    <section className={s.topCourts}>
      <h2 className={s.title}>Наші найкращі майданчики</h2>
      <div className={s.wrapper}>
        <ul className={s.list}>
          {size.width <= 1150 && (
            <Slider
              slidesToShow={1}
              slidesToScroll={1}
              isInfinite={true}
              isArrows={false}
              isModal={false}
              isAutoplay={true}
              arrayLength={courtList.length}
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
          )}

          {size.width >= 1151 && (
            <>
              {courtList.map((court) => (
                <li key={court.id} className={s.listItem}>
                  <CourtCard courtInfo={court} />
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </section>
  );
}
