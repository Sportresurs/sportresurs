import { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Filters.module.scss";
import CloseFilterWindowIcon from "../../public/svg/closeFilterWindow.svg";
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

const FilterWindow = ({
  getNewAreas,
  filters,
  counter,
  setFilters,
  changeStatus,
}) => {
  const [purposeOfAreas, setPurposeOfAreas] = useState(filters.purposeOfAreas);
  const [districts, setDistricts] = useState(filters.districts);
  const [rating, setRating] = useState(filters.rating);

  const changeRatingValue = (e) => {
    setRating({ value: Number(e.target.value) });
  };

  const applyFilters = () => {
    setFilters({
      purposeOfAreas,
      districts,
      rating,
      array: [...purposeOfAreas, ...districts, rating],
    });
    changeStatus(false);
    getNewAreas([...purposeOfAreas, ...districts, rating]);
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
          handleChange={setDistricts}
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
          <Rating
            color="black"
            value={rating.value}
            onChange={changeRatingValue}
          />
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

CloseFilterWindow.propTypes = {
  changeStatus: PropTypes.func,
};

FilterWindow.propTypes = {
  getNewAreas: PropTypes.func,
  filters: PropTypes.object,
  counter: PropTypes.number,
  setFilters: PropTypes.func,
  changeStatus: PropTypes.func,
};

export default FilterWindow;
