import Link from "next/link";
import { useState, useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";
import classNames from "classnames/bind";
/* import Context from "../../context"; */
import { Context } from "../../context";
import Button from "../Button/Button";
import { Grid } from "../Grid/Grid";
import styles from "./SearchSection.module.scss";
import SearchIcon from "../../public/svg/searchIcon.svg";
import Basket from "../../public/svg/basketballIcon.svg";
import Football from "../../public/svg/footballIcon.svg";
import Child from "../../public/svg/childrenIcon.svg";
import Tenis from "../../public/svg/tenisIcon.svg";
import Close from "../../public/svg/closeAutoCIcon.svg";

const cx = classNames.bind(styles);

function SearchSection({ isScriptLoaded, isScriptLoadSucceed }) {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const { handleCoordinates } = useContext(Context);

  const handleInputClear = () => {
    setAddress("");
  };

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);
    setAddress(value);
    setCoordinates(ll);
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search cor submit: ", coordinates);
    handleInputClear();
  }; */

  /* const handleSubmit = () => {
    handleCoordinates(coordinates);
    handleInputClear();
  }; */

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
      <section className={styles.section}>
        <Grid>
          <div className={styles.box}>
            <h2 className={styles.title}>Знайди свій ідеальний майданчик</h2>

            <form className={styles.form} /* onSubmit={handleSubmit} */>
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
              </div>
              <Link href="/playgrounds">
                <a
                  className={styles.formBtn}
                  onClick={handleCoordinates(coordinates)}
                >
                  <span className={styles.formBtnContent}>
                    Пошук майданчика
                  </span>
                  <SearchIcon className={styles.formBtnIcon} />
                </a>
              </Link>
            </form>

            <ul className={styles.btnList}>
              <li className={styles.btnItem}>
                <Button variant="orange" size="medium">
                  <span className={styles.btnContent}>Баскетбольний</span>
                  <Basket className={styles.btnIcon} />
                </Button>
              </li>
              <li className={styles.btnItem}>
                <Button variant="green" size="medium">
                  <span className={styles.btnContent}>Футбольний</span>
                  <Football className={styles.btnIcon} />
                </Button>
              </li>
              <li className={styles.btnItem}>
                <Button variant="blue" size="medium">
                  <span className={styles.btnContent}>Дитячий</span>
                  <Child className={styles.btnIcon} />
                </Button>
              </li>
              <li className={styles.btnItem}>
                <Button variant="lilac" size="medium">
                  <span className={styles.btnContent}>Тенісний</span>
                  <Tenis className={styles.btnIcon} />
                </Button>
              </li>
            </ul>
          </div>
        </Grid>
      </section>
    );
  }
  return <div></div>;
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCQpQm5NpH4H9sGBd66F8UzhPuAsyFEZTA",
])(SearchSection);
