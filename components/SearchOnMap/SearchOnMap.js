import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SearchOnMap.module.scss";
import SearchIcon from "../../public/svg/searchIcon.svg";
import Close from "../../public/svg/closeAutoCIcon.svg";
import FilterIcon from "../../public/svg/filterIcon.svg";

const cx = classNames.bind(styles);
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function SearchOnMap({
  handleCoordinates,
  onToggle,
  numberOfFilters,
  isScriptLoaded,
  isScriptLoadSucceed,
}) {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const handleInputClear = () => {
    setAddress("");
  };

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);
    setAddress(value);
    setCoordinates(ll);
  };

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCoordinates(coordinates);
    handleInputClear();
  };

  const searchOptions = () => {
    if (typeof window !== "undefined") {
      return {
        location: new window.google.maps.LatLng(49.842957, 24.031111),
        radius: 30000,
        types: ["address"],
      };
    }
    return null;
  };

  const onError = (status, clearSuggestions) => {
    clearSuggestions();
  };

  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
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
          </button>

          {numberOfFilters && (
            <div className={styles.numFilters}>{numberOfFilters}</div>
          )}
        </div>

        <button className={styles.formBtn} type="submit">
          <SearchIcon className={styles.formBtnIcon} width={21} height={22} />
        </button>
      </form>
    );
  }
  return <div></div>;
}

SearchOnMap.propTypes = {
  handleCoordinates: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  numberOfFilters: PropTypes.number.isRequired,
};

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`,
])(SearchOnMap);
