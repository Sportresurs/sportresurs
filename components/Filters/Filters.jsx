import { useState } from "react";
import classNames from "classnames";
import styles from "./Filters.module.scss";
import FilterIcon from "../../public/svg/filterIcon.svg";
import CloseFilterWindowIcon from "../../public/svg/closeFilterWindow.svg";
import FilterTag from "../FilterTag";
import Rating from "../Rating";
import Button from "../Button";
import MultiSelect from "../MultiSelect/MultiSelect";

const CloseFilterWindow = ({ changeStatus }) => {
  const wrapperIconClasses = classNames(styles.closeWindowButton);
  return (
    <button className={wrapperIconClasses} onClick={() => changeStatus(false)}>
      <CloseFilterWindowIcon />
    </button>
  );
};

const FilterButton = ({ counter, changeStatus }) => {
  const wrapperIconClasses = classNames(styles.filterButton);
  const counterIconClasses = classNames(styles.counterIcon);
  return (
    <button className={wrapperIconClasses} onClick={() => changeStatus(true)}>
      {counter ? <span className={counterIconClasses}>{counter}</span> : null}
      <FilterIcon />
    </button>
  );
};

const FilterWindow = ({ counter, setFiltres, changeStatus }) => {
  const [purposeOfAreas, setPurposeOfAreas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [rating, setRating] = useState(0);

  const changeRatingValue = (e) => {
    setRating(Number(e.target.value));
  };

  const applyFilters = () => {
    setFiltres([...purposeOfAreas, ...districts, rating]);
    changeStatus(false);
  };

  const classesButton = classNames(styles.buttonApply);

  return (
    <div className={styles.filterWindow}>
      <div className={styles.filterHead}>
        <CloseFilterWindow changeStatus={changeStatus} />
        <span>Фільтри</span>
        {counter > 0 ? counter : null}
      </div>
      <div className={styles.filterBody}>
        <MultiSelect
          value={purposeOfAreas}
          handleChange={setPurposeOfAreas}
          type="ПРИЗНАЧЕННЯ МАЙДАНЧИКА"
          data={[
            "Спортивний",
            "Дитячий",
            "Баскетбольний",
            "Тенісний",
            "Футбольний",
            "Стріт воркаут",
            "Скейт-майданчик",
            "Бігові доріжки",
          ]}
        />
        <MultiSelect
          value={districts}
          handleChange={setDistricts}
          data={[
            "Галицький",
            "Шевченківський",
            "Франківський",
            "Залізничний",
            "Сихівський",
            "Личаківський",
            "Інший",
          ]}
        />
        <div className={styles.filterBodyRating}>
          <p>РЕЙТИНГ</p>
          <Rating color="black" value={rating} onChange={changeRatingValue} />
        </div>
        <Button
          onClick={applyFilters}
          className={classesButton}
          variant="black"
        >
          ЗАСТОСУВАТИ ФІЛЬТРИ
        </Button>
      </div>
    </div>
  );
};

const Filters = () => {
  const [isOpen, changeStatus] = useState(false);
  const [filtres, setFiltres] = useState([
    "Галицький",
    "Сихівський",
    "Шевченківський",
    "Франківський",
  ]);

  const tagClasses = classNames(styles.selectTag);

  const deleteTag = (tag) => () => {
    setFiltres((oldFilters) => oldFilters.filter((item) => item !== tag));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Майданчики</h1>
        <FilterButton counter={filtres.length} changeStatus={changeStatus} />
        {isOpen && (
          <FilterWindow
            counter={filtres.length}
            setFiltres={setFiltres}
            changeStatus={changeStatus}
          />
        )}
      </div>
      <div>
        {filtres.map((item) => (
          <FilterTag
            key={item}
            className={tagClasses}
            text={String(item)}
            onClick={deleteTag(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
