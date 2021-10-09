import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SearchOnMap.module.scss";
import { LVIV_COORDINATES } from "../../utils/constants";
import SearchIcon from "../../public/svg/searchIcon.svg";
import Close from "../../public/svg/closeAutoCIcon.svg";
import FilterIcon from "../../public/svg/filterIconMap.svg";

const cx = classNames.bind(styles);

const SearchOnMap = ({ handleCoordinates, onToggle, numberOfFilters }) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const handleInputClear = () => {
    setAddress("");
  };

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCoordinates(coordinates);
    handleInputClear();
  };

  const searchOptions = () =>
    window.google && {
      location: new window.google.maps.LatLng(
        LVIV_COORDINATES.lat,
        LVIV_COORDINATES.lng
      ),
      radius: 30000,
      types: ["address"],
    };

  const onError = (_, clearSuggestions) => {
    clearSuggestions();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={searchOptions()}
            onError={onError}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Введіть назву вулиці",
                    className: styles.input,
                  })}
                />
                {suggestions.length >= 1 && (
                  <div className={cx("autocomplete")}>
                    {suggestions.map((suggestion) => (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: cx("autocompleteItem", {
                            hover: suggestion.active,
                          }),
                        })}
                        key={suggestion.description}
                      >
                        <span className={cx("autocompleteMainText")}>
                          {suggestion.formattedSuggestion.mainText}
                        </span>
                        <span className={cx("autocompleteSecondaryText")}>
                          {suggestion.formattedSuggestion.secondaryText}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </PlacesAutocomplete>
          {address && (
            <button
              className={styles.fromBtnClose}
              type="button"
              onClick={handleInputClear}
            >
              <Close className={styles.fromBtnCloseIcon}></Close>
            </button>
          )}

          <button
            className={styles.formBtnFilter}
            type="button"
            onClick={onToggle}
          >
            <FilterIcon className={styles.formBtnFilterIcon} />
            {numberOfFilters ? (
              <div className={styles.numFilters}>{numberOfFilters}</div>
            ) : null}
          </button>
        </div>

        <button className={styles.formBtn} type="submit">
          <SearchIcon className={styles.formBtnIcon} width={21} height={22} />
        </button>
      </form>
    </>
  );
};

SearchOnMap.propTypes = {
  handleCoordinates: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  numberOfFilters: PropTypes.number.isRequired,
  API_KEY: PropTypes.string.isRequired,
};

export default SearchOnMap;
