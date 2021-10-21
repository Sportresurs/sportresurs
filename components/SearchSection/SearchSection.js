import Script from "next/script";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import classNames from "classnames/bind";
import { LVIV_COORDINATES } from "../../utils/constants";
import { Context } from "../../context";
import styles from "./SearchSection.module.scss";
import SearchIcon from "../../public/svg/searchIcon.svg";
import Close from "../../public/svg/closeAutoCIcon.svg";
import Slider from "../Slider";
import useWindowSize from "../../utils/hooks/findWindowSize";

const cx = classNames.bind(styles);
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const districtsLink = [
  { district: "Личаківський", color: "orange" },
  { district: "Шевченківський", color: "green" },
  { district: "Франківський", color: "blue" },
  { district: "Залізничний", color: "lilac" },
];
const mapBounds = {
  north: 49.96325058667949,
  south: 49.7223633490448,
  east: 24.210497138916054,
  west: 23.851724861084023,
};

function SearchSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const { handleCoordinates, handleFilterDistrict } = useContext(Context);
  const size = useWindowSize();

  useEffect(() => window.google && setIsLoaded(true), []);

  const handleInputClear = () => {
    setAddress("");
  };

  const handleChange = (value) => {
    setAddress(value);
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
      <Script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
      <section className={styles.section}>
        <div className={styles.box}>
          <h2 className={styles.title}>Знайди свій ідеальний майданчик</h2>

          <form className={styles.form}>
            {!isLoaded && <div className={styles.boxPlug}></div>}
            {isLoaded && (
              <>
                <div className={styles.inputBox}>
                  <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    searchOptions={searchOptions()}
                    onError={onError}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                    }) => (
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
                                <span
                                  className={cx("autocompleteSecondaryText")}
                                >
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
                </div>
                <Link href="/map">
                  <a
                    role="link"
                    tabIndex={0}
                    className={cx("formBtn", {
                      disabled: !address,
                    })}
                    onClick={handleCoordinates(coordinates)}
                  >
                    <span className={styles.formBtnContent}>
                      Пошук майданчика
                    </span>
                    <SearchIcon className={styles.formBtnIcon} />
                  </a>
                </Link>
              </>
            )}
          </form>

          <ul className={styles.linkList}>
            {size.width <= 670 && (
              <Slider
                isDots={false}
                slidesToShow={4}
                slidesToScroll={1}
                isInfinite={true}
                isVariableWidth={true}
                withArrows={false}
                arrayLength={4}
                classNameBox={styles.sliderBox}
                responsive={[
                  {
                    breakpoint: 671,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ]}
              >
                {districtsLink.map(({ district, color }) => (
                  <li key={district} className={styles.linkItem}>
                    <Link href="/map" passHref>
                      <a
                        role="link"
                        tabIndex={0}
                        className={cx("link", color)}
                        onClick={handleFilterDistrict}
                      >
                        {district}
                      </a>
                    </Link>
                  </li>
                ))}
              </Slider>
            )}
            {size.width >= 671 && (
              <>
                {districtsLink.map(({ district, color }) => (
                  <li key={district} className={styles.linkItem}>
                    <Link href="/map" passHref>
                      <a
                        role="link"
                        tabIndex={0}
                        className={cx("link", color)}
                        onClick={handleFilterDistrict}
                      >
                        {district}
                      </a>
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export default SearchSection;
