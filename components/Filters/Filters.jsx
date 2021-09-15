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
  const [purposeOfAreas, setPurposeOfAreas] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [rating, setRating] = useState(0);

  const handleChange1 = (option) => {
    setPurposeOfAreas(option);
  };
  const handleChange2 = (option) => {
    setDistricts(option);
  };
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
          handleChange={handleChange1}
          type="ПРИЗНАЧЕННЯ МАЙДАНЧИКА"
          data={[
            { label: "Спортивний", value: "Спортивний" },
            { label: "Дитячий", value: "Дитячий" },
            { label: "Тенісний", value: "Тенісний" },
            { label: "Футбольний", value: "Футбольний" },
            { label: "Стріт воркаут", value: "Стріт воркаут" },
            { label: "Скейт-майданчик", value: "Скейт-майданчик" },
            { label: "Бігові доріжки", value: "Бігові доріжки" },
          ]}
        />
        <MultiSelect
          value={districts}
          handleChange={handleChange2}
          type="РАЙОН"
          data={[
            { label: "Шевченківський", value: "Шевченківський" },
            { label: "Франківський", value: "Франківський" },
            { label: "Личаківський", value: "Личаківський" },
            { label: "Залізничний", value: "Залізничний" },
            { label: "Сихівський", value: "Сихівський" },
            { label: "Галицький", value: "Галицький" },
            { label: "Інший", value: "Інший" },
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
  const [filtres, setFiltres] = useState([]);

  const tagClasses = classNames(styles.selectTag);

  const deleteTag = (tag) => () => {
    setFiltres((oldFilters) => oldFilters.filter((item) => item !== tag));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Майданчики</h1>
        <FilterButton
          counter={filtres.filter((item) => item !== 0).length}
          changeStatus={changeStatus}
        />
        {isOpen && (
          <FilterWindow
            counter={filtres.filter((item) => item !== 0).length}
            setFiltres={setFiltres}
            changeStatus={changeStatus}
          />
        )}
      </div>
      <div>
        {filtres.map((item) => {
          if (!item) {
            return null;
          }
          return (
            <FilterTag
              key={item}
              className={tagClasses}
              text={String(item)}
              onClick={deleteTag(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
