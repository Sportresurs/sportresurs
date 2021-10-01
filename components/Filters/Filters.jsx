import { useState, useContext } from "react";
import axios from "axios";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Filters.module.scss";
import FilterIcon from "../../public/svg/filterIcon.svg";
import FilterTag from "../FilterTag";
import FilterWindow from "./FilterWindow";
import SearchOnMap from "../SearchOnMap";
import { Context } from "../../context";

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

const Filters = ({ setAreas, location, handleCoordinates, API_KEY }) => {
  const { filterData } = useContext(Context);
  const [isOpen, changeStatus] = useState(false);
  const [filters, setFilters] = useState({
    purposeOfAreas: filterData.purposeOfAreas,
    districts: filterData.districts,
    rating: { value: 0 },
    array: [],
  });

  const getNewAreas = async (purposes, districts, rating) => {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:3000/api/areas",
      data: {
        purposes: purposes.map((item) => item.value.toLowerCase()),
        districts: districts.map((item) => item.value),
        rating: rating.value,
      },
    });
    setAreas(data.areas);
  };

  const deleteTag = (tag) => {
    const newPurposeOfAreas = filters.purposeOfAreas.filter(
      (item) => item.value !== tag.value
    );
    const newDistricts = filters.districts.filter(
      (item) => item.value !== tag.value
    );
    const newRating = tag === filters.rating ? { value: 0 } : filters.rating;
    const newArray = [...newPurposeOfAreas, ...newDistricts, newRating];
    setFilters({
      purposeOfAreas: newPurposeOfAreas,
      districts: newDistricts,
      rating: newRating,
      array: newArray,
    });
    getNewAreas(newPurposeOfAreas, newDistricts, newRating);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        {location === "playgrounds" ? (
          <>
            <h1 className={styles.title}>Майданчики</h1>
            <FilterButton
              counter={filters.array.filter((item) => item.value).length}
              changeStatus={changeStatus}
            />
          </>
        ) : (
          <SearchOnMap
            onToggle={changeStatus}
            handleCoordinates={handleCoordinates}
            numberOfFilters={filters.array.filter((item) => item.value).length}
            API_KEY={API_KEY}
          />
        )}
        {isOpen && (
          <FilterWindow
            getNewAreas={getNewAreas}
            filters={filters}
            counter={filters.array.filter((item) => item.value).length}
            setFilters={setFilters}
            changeStatus={changeStatus}
          />
        )}
      </div>
      <div>
        {filters.array.map((item) => {
          if (!item.value) {
            return null;
          }
          return (
            <FilterTag key={item.value} data={item} deleteTag={deleteTag} />
          );
        })}
      </div>
    </div>
  );
};

FilterButton.propTypes = {
  counter: PropTypes.number,
  changeStatus: PropTypes.func,
};

Filters.defaultProps = {
  location: "playgrounds",
  setAreas: () => {},
  handleCoordinates: () => {},
};

Filters.propTypes = {
  setAreas: PropTypes.func,
  handleCoordinates: PropTypes.func,
};

export default Filters;
