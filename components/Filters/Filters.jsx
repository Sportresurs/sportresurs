import { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Filters.module.scss";
import FilterIcon from "../../public/svg/filterIcon.svg";
import FilterTag from "../FilterTag";
import FilterWindow from "./FIlterWindow";
import SearchOnMap from "../SearchOnMap";

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
  const [isOpen, changeStatus] = useState(false);
  const [filters, setFilters] = useState({
    purposeOfAreas: [],
    districts: [],
    rating: { value: 0 },
    array: [],
  });

  // eslint-disable-next-line no-shadow
  const getNewAreas = (filters) => {
    // eslint-disable-next-line no-unused-vars
    const normalizedValues = filters.map((item) => item.value);
    // Exsample: const data = axios.post(URL_API, { filters: normalizedValues });
    setAreas();
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
    getNewAreas(newArray);
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
