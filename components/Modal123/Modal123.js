import s from "./Modal123.module.scss";
import Slider from "../Slider";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Modal() {
  return (
    <div className={s.modal}>
      <Slider
        margin={30}
        slidesToShow={1}
        slidesToScroll={1}
        isArrows={true}
        arrayLength={arr.length}
        isModal={false}
      >
        {arr.map((item) => (
          <li key={item} className={s.box}>
            <h3 className={s.title}>{item}</h3>
          </li>
        ))}
      </Slider>
    </div>
  );
}
