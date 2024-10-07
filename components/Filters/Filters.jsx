/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Filters.module.scss";
import FilterIcon from "../../public/svg/filterIcon.svg";
import FilterTag from "../FilterTag";
import FilterWindow from "./FilterWindow";
import SearchOnMap from "../SearchOnMap";
import axiosInstance from "../../api/axiosInstance";

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

const Filters = ({
  location,
  handleCoordinates,
  setSearchPinCoords,
  router,
}) => {
  const [filterFields, setFilterFields] = useState({
    purposes: [],
    districts: [],
  });
  const [isOpen, changeStatus] = useState(false);
  const [filters, setFilters] = useState({
    purposeOfAreas: [],
    districts: [],
    rating: { value: 0 },
    array: [],
  });

  useEffect(() => {
    const query = { ...router.query };

    if (query.purposeOfAreas) {
      const purposeValues = query.purposeOfAreas
        .split(",")
        .map((el) => ({ value: el, label: el }));

      setFilters((prev) => ({
        ...prev,
        purposeOfAreas: purposeValues,
        array: [...prev.array, ...purposeValues],
      }));
    }

    if (query.rating) {
      setFilters((prev) => ({
        ...prev,
        rating: { value: Number(query.rating) },
        array: [...prev.array, { value: Number(query.rating) }],
      }));
    }

    if (query.districts) {
      const districtsValue = query.districts
        .split(",")
        .map((el) => ({ value: el, label: el }));
      setFilters((prev) => ({
        ...prev,
        districts: districtsValue,
        array: [...prev.array, ...districtsValue],
      }));
    }
  }, []);

  const handleFiltersQuerySearchParams = ({
    purposeOfAreas,
    districts,
    rating,
  }) => {
    const query = { ...router.query };

    if (purposeOfAreas && purposeOfAreas.length) {
      query.purposeOfAreas = purposeOfAreas.map((el) => el.value).join(",");
    } else {
      delete query.purposeOfAreas;
    }

    if (districts && districts.length) {
      query.districts = districts.map((el) => el.value).join(",");
    } else {
      delete query.districts;
    }

    if (rating && rating.value) {
      query.rating = rating.value;
    } else {
      delete query.rating;
    }

    query.page = 1;

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const toggleStatus = () => changeStatus((currentStatus) => !currentStatus);

  const getFiltersOptions = async () => {
    const { data } = await axiosInstance.get("/areas/filter-fields");

    setFilterFields(data);
  };

  useEffect(() => {
    try {
      getFiltersOptions();
    } catch (error) {
      throw new Error(error);
    }
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

    handleFiltersQuerySearchParams({
      purposeOfAreas: newPurposeOfAreas,
      districts: newDistricts,
      rating: newRating,
    });
  };

  return (
    <div>
      <div className={styles.wrapper}>
        {location === "playgrounds" ? (
          <>
            <h1 className={styles.title}>Спортивна та дитяча інфраструктура</h1>
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
            filters={filters}
            counter={filters.array.filter((item) => item.value).length}
            setFilters={setFilters}
            changeStatus={changeStatus}
            handleQueryParams={handleFiltersQuerySearchParams}
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
