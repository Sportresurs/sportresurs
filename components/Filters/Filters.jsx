/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect, useCallback } from "react";
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
function getInitialStateFromContext(filterData) {
  return {
    purposeOfAreas: filterData.purposeOfAreas,
    districts: filterData.districts,
    rating: { value: 0 },
    array: [...filterData.purposeOfAreas, ...filterData.districts],
  };
}
const Filters = ({
  areas,
  location,
  handleCoordinates,
  setSearchPinCoords,
}) => {
  const { setAreas, filterData, filterFields, setFilterData } =
    useContext(Context);
  const [isOpen, changeStatus] = useState(false);
  const [filters, setFilters] = useState(
    getInitialStateFromContext(filterData)
  );

  const toggleStatus = () => changeStatus((currentStatus) => !currentStatus);

  const getNewAreas = useCallback(
    (purposes, districts, rating) => {
      const purposeValues = purposes.map((item) => item.value.toLowerCase());
      const districtValues = districts.map((item) => item.value);
      const data = areas.filter((area) => {
        const areaPurposes = area.Purposes.map((item) => item.title);
        return (
          purposeValues.every((value) => areaPurposes.includes(value)) &&
          (districtValues.length
            ? districtValues.includes(area.district)
            : true) &&
          area.rating >= rating.value
        );
      });
      return setAreas(data);
    },
    [areas, setAreas]
  );

  useEffect(() => {
    if (filterData) {
      const newFilters = getInitialStateFromContext(filterData);
      getNewAreas(
        newFilters.purposeOfAreas,
        newFilters.districts,
        newFilters.rating
      );
      setFilters(newFilters);
    }
  }, [filterData]);

  useEffect(() => {
    getNewAreas(filters.purposeOfAreas, filters.districts, filters.rating);
    return () => {
      setFilterData({
        purposeOfAreas: [],
        districts: [],
        rating: { value: 0 },
      });
    };
  }, []);

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
            <h1 className={styles.title}>Спортивна інфраструктура</h1>
            <FilterButton
              counter={filters.array.filter((item) => item.value).length}
              changeStatus={toggleStatus}
            />
          </>
        ) : (
          <SearchOnMap
            onToggle={changeStatus}
            handleCoordinates={handleCoordinates}
            numberOfFilters={filters.array.filter((item) => item.value).length}
          />
        )}
        {isOpen && (
          <FilterWindow
            setSearchPinCoords={setSearchPinCoords}
            filterFields={filterFields}
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
