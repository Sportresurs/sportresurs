import styles from "./TopCourts.module.scss";
import CourtCard from "../CourtCard";
import Slider from "../Slider";
import useWindowSize from "../../utils/hooks/findWindowSize";

export default function TopCourts({ courtList }) {
  const size = useWindowSize();

  return (
    <section className={styles.topCourts}>
      <h2 className={styles.title}>Наші найкращі майданчики</h2>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {size.width <= 1150 && (
            <Slider
              slidesToShow={courtList.length}
              slidesToScroll={1}
              isInfinite={true}
              withArrows={false}
              isModal={false}
              isAutoplay={true}
              isVariableWidth={true}
              arrayLength={courtList.length}
              classNameBox={styles.topCourtsSlider}
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
                <li key={court.id} className={styles.listItem}>
                  <CourtCard courtInfo={court} />
                </li>
              ))}
            </Slider>
          )}
          {size.width >= 1151 &&
            courtList.map((court) => (
              <li key={court.id} className={styles.listItem}>
                <CourtCard courtInfo={court} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
