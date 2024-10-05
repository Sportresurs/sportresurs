import { useContext, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Rating from "../Rating";
import Button from "../Button";
import MultiSelect from "../MultiSelect/MultiSelect";
import styles from "./Filters.module.scss";
import { Context } from "../../context";
import CloseFilterWindowIcon from "../../public/svg/closeFilterWindow.svg";

const CloseFilterWindow = ({ changeStatus }) => {
  const wrapperIconClasses = classNames(styles.closeWindowButton);
  return (
    <button className={wrapperIconClasses} onClick={() => changeStatus(false)}>
      <CloseFilterWindowIcon />
    </button>
  );
};

const FilterWindow = ({
  filterFields,
  filters,
  counter,
  setFilters,
  changeStatus,
  setSearchPinCoords,
  handleQueryParams,
}) => {
  const { showFilteredDistrict, setIsSearchPinShow } = useContext(Context);
  const [purposeOfAreas, setPurposeOfAreas] = useState(filters.purposeOfAreas);
  const [districts, setDistricts] = useState(filters.districts);
  const [rating, setRating] = useState(filters.rating);

  const changeRatingValue = (e) => {
    setRating({ value: Number(e.target.value) });
  };

  const applyFilters = () => {
    if (setSearchPinCoords) {
      setSearchPinCoords(null);
    }
    setFilters({
      purposeOfAreas,
      districts,
      rating,
      array: [...purposeOfAreas, ...districts, rating],
    });

    handleQueryParams({ purposeOfAreas, districts, rating });

    changeStatus(false);
    if (districts[0]) {
      showFilteredDistrict(districts);
    }
    setIsSearchPinShow(false);
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
          type="ВИДИ СПОРТУ"
          data={filterFields.purposes.map((item) => ({
            value: item,
            label: item,
          }))}
          onChange={setPurposeOfAreas}
        />
        <MultiSelect
          value={districts}
          type="РАЙОН"
          data={filterFields.districts.map((item) => ({
            value: item,
            label: item,
          }))}
          onChange={setDistricts}
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
          className={classesButton}
          variant="black"
          onClick={applyFilters}
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
