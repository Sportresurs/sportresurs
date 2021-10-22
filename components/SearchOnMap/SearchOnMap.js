import { useState, useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Context } from "../../context";
import styles from "./SearchOnMap.module.scss";
import { LVIV_COORDINATES } from "../../utils/constants";
import SearchIcon from "../../public/svg/searchIcon.svg";
import Close from "../../public/svg/closeAutoCIcon.svg";
import FilterIcon from "../../public/svg/filterIconMap.svg";

const cx = classNames.bind(styles);
const mapBounds = {
  north: 49.96325058667949,
  south: 49.7223633490448,
  east: 24.210497138916054,
  west: 23.851724861084023,
};

const SearchOnMap = ({ handleCoordinates, onToggle, numberOfFilters }) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const { setZoom, setIsSearchPinShow } = useContext(Context);

  const handleInputClear = () => {
    setAddress("");
  };

  const checkLatLng = (coords) => {
    if (
      coords.lat < mapBounds.south ||
      coords.lat > mapBounds.north ||
      coords.lng < mapBounds.west ||
      coords.lng > mapBounds.east
    ) {
      setCoordinates(LVIV_COORDINATES);
    } else {
      setCoordinates(coords);
    }
  };

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    setAddress(value);
    checkLatLng(latLng);
  };

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setZoom(16);
    setIsSearchPinShow(true);
    handleCoordinates(coordinates);
    handleInputClear();
  };

  const searchOptions = () =>
    window.google && {
      location: new window.google.maps.LatLng(
        LVIV_COORDINATES.lat,
        LVIV_COORDINATES.lng
      ),
      bounds: {
        ...mapBounds,
      },
      componentRestrictions: { country: "ua" },
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
