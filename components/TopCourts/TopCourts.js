import styles from "./TopCourts.module.scss";
import CourtCard from "../CourtCard";
import Slider from "../Slider";
import useWindowSize from "../../utils/hooks/findWindowSize";

export default function TopCourts({ courtList }) {
  const size = useWindowSize();

  const calculateWidth = (value) => {
    let width = null;

    if (value >= 901 && value <= 1000) {
      width = value * 0.82;
    }
    if (value >= 751 && value <= 900) {
      width = value * 0.86;
    }
    if (value >= 601 && value <= 750) {
      width = value * 0.88;
    }
    if (value <= 600) {
      width = value * 0.9;
    }

    return width;
  };

  const widthOfContainer = calculateWidth(size.width);

  return (
    <section className={styles.topCourts}>
      <h2 className={styles.title}>Наші найкращі майданчики</h2>
      <div className={styles.wrapper}>
        <ul className={styles.list} style={{ width: widthOfContainer }}>
          {size.width <= 1150 && (
            <Slider
              slidesToShow={4}
              slidesToScroll={1}
              isInfinite={true}
              withArrows={false}
              isModal={false}
              isAutoplay={false}
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
