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

function SearchSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const { handleCoordinates, handleFilterData } = useContext(Context);
  const size = useWindowSize();

  const calculateWidth = (value) => {
    let width = null;

    if (value >= 601 && value <= 670) {
      width = value * 0.88;
    }
    if (value <= 600) {
      width = value * 0.9;
    }

    return width;
  };

  const widthOfContainer = calculateWidth(size.width);

  useEffect(() => window.google && setIsLoaded(true), []);

  const handleInputClear = () => {
    setAddress("");
  };

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    setAddress(value);
    setCoordinates(latLng);
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

          <ul className={styles.linkList} style={{ width: widthOfContainer }}>
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
                <li className={styles.linkItem}>
                  <Link href="/map" passHref>
                    <a
                      className={cx("link", "orange")}
                      onClick={handleFilterData}
                    >
                      Личаківський
                    </a>
                  </Link>
                </li>
                <li className={styles.linkItem}>
                  <Link href="/map" passHref>
                    <a
                      className={cx("link", "green")}
                      onClick={handleFilterData}
                    >
                      Шевченківський
                    </a>
                  </Link>
                </li>
                <li className={styles.linkItem}>
                  <Link href="/map" passHref>
                    <a
                      className={cx("link", "blue")}
                      onClick={handleFilterData}
                    >
                      Франківський
                    </a>
                  </Link>
                </li>
                <li className={styles.linkItem}>
                  <Link href="/map" passHref>
                    <a
                      className={cx("link", "lilac")}
                      onClick={handleFilterData}
                    >
                      Залізничний
                    </a>
                  </Link>
                </li>
              </Slider>
            )}
            {size.width >= 671 && (
              <>
                <li className={styles.linkItem}>
                  <Link href="/map" passHref>
                    <a
                      className={cx("link", "orange")}
                      onClick={handleFilterData}
                    >
                      Личаківський
                    </a>
                  </Link>
                </li>
                <li className={styles.linkItem}>
                  <Link href="/map" passHref>
                    <a
                      className={cx("link", "green")}
                      onClick={handleFilterData}
                    >
                      Шевченківський
                    </a>
                  </Link>
                </li>
                <li className={styles.linkItem}>
                  <Link href="/map" passHref>
                    <a
                      className={cx("link", "blue")}
                      onClick={handleFilterData}
                    >
                      Франківський
                    </a>
                  </Link>
                </li>
                <li className={styles.linkItem}>
                  <Link href="/map" passHref>
                    <a
                      className={cx("link", "lilac")}
                      onClick={handleFilterData}
                    >
                      Залізничний
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export default SearchSection;
