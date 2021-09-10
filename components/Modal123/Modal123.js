import s from "./Modal123.module.scss";
import Slider from "../Slider";

/* const photos = [
  {
    name: "photo 1",
    url: "https://cdn.pixabay.com/photo/2021/08/28/18/09/common-heather-6581569_960_720.jpg",
  },
  {
    name: "photo 2",
    url: "https://cdn.pixabay.com/photo/2021/08/30/21/29/port-6587129_960_720.jpg",
  },
  {
    name: "photo 3",
    url: "https://cdn.pixabay.com/photo/2021/08/28/18/09/common-heather-6581569_960_720.jpg",
  },
  {
    name: "photo 4",
    url: "https://cdn.pixabay.com/photo/2021/08/30/21/29/port-6587129_960_720.jpg",
  },
  {
    name: "photo 5",
    url: "https://cdn.pixabay.com/photo/2021/08/28/18/09/common-heather-6581569_960_720.jpg",
  },
  {
    name: "photo 6",
    url: "https://cdn.pixabay.com/photo/2021/08/30/21/29/port-6587129_960_720.jpg",
  },
  {
    name: "photo 7",
    url: "https://cdn.pixabay.com/photo/2021/08/28/18/09/common-heather-6581569_960_720.jpg",
  },
  {
    name: "photo 8",
    url: "https://cdn.pixabay.com/photo/2021/08/30/21/29/port-6587129_960_720.jpg",
  },
]; */

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Modal() {
  return (
    <div className={s.modal}>
      <Slider
        spaceBetween={30}
        isModal={true}
        slidesToShow={3}
        isArrows={true}
        slidesToScroll={1}
      >
        {/* {photos.map((photo) => (
          <div key={photo.name} className={s.boxImg}>
            <img src={photo.url} alt={photo.name} className={s.img} />
          </div>
        ))} */}

        {arr.map((item) => (
          <li key={item} className={s.box}>
            <h3 className={s.title}>{item}</h3>
          </li>
        ))}
      </Slider>
    </div>
  );
}
