import React, { useCallback, useRef, useState, useEffect } from "react";
import throttle from "lodash.throttle";
import classNames from "classnames";
import Map from "../components/Map";
import styles from "../styles/MapPage.module.scss";
import Filters from "../components/Filters";
import data from "../utils/testData/courtDatabase";
import PlaygroundsList from "../components/PlaygroundsList";
import PlaygroundImage from "../public/svg/mapBackground.svg";
import image from "../public/img/playgroundItemImage.png";
import PlaygroundsSlider from "../components/PlaygroundsSlider";
import HideMark from "../public/svg/hideSliderArrow.svg";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // !! should be replaced to Sportresource key
const DEFAULT_CENTER = { lat: 49.841328, lng: 24.031592 };
const DEFAULT_ZOOM = 15;

const playgrounds = [
  {
    id: 23,
    address: "вул.Довженка 23 ",
    color: "green",
    district: "Шевченківський",
    type: "спортивний",
    covering: "штучна трава",
    opening: "08:00 - 22:00",
    rating: 4.5,
    img: image,
  },
  {
    id: 24,
    address: "вул.Довженка 24 ",
    color: "yellow",
    district: "Сихівський",
    type: "спортивний",
    covering: "штучна трава",
    opening: "08:00 - 22:00",
    rating: 4.5,
    img: image,
  },
  {
    id: 25,
    address: "вул.Довженка 25 ",
    color: "red",
    district: "Сихівський",
    type: "спортивний",
    covering: "штучна трава",
    opening: "08:00 - 22:00",
    rating: 4.5,
    img: image,
  },
  {
    id: 26,
    address: "вул.Довженка 25 ",
    color: "red",
    district: "Сихівський",
    type: "спортивний",
    covering: "штучна трава",
    opening: "08:00 - 22:00",
    rating: 4.5,
    img: image,
  },
  {
    id: 27,
    address: "вул.Довженка 25 ",
    color: "red",
    district: "Сихівський",
    type: "спортивний",
    covering: "штучна трава",
    opening: "08:00 - 22:00",
    rating: 4.5,
    img: image,
  },
];

export default function MapPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [places] = useState(data.courtsDataBase);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  useEffect(() => {}, [filteredPlaces]);
  const mapRef = useRef();
  const filterPlaces = useCallback(() => {
    if (!mapRef.current) {
      return;
    }

    const bounds = mapRef.current.getBounds();
    setFilteredPlaces(
      places.filter((place) =>
        bounds.contains({ lat: place.latitude, lng: place.longitude })
      )
    );
  }, [places]);

  const filterPlacesThrottled = useRef(throttle(filterPlaces, 500));

  const onMapLoaded = useCallback(
    (map) => {
      mapRef.current = map;
      filterPlaces();
    },
    [filterPlaces]
  );

  const onMapChanged = useCallback(() => {
    filterPlacesThrottled.current();
  }, []);

  const [childClicked, setChildClicked] = useState(null);

  const handleSliderShow = () => {
    setIsOpen(!isOpen);
  };

  const sliderWrapperClass = classNames(styles.sliderWrapper, {
    [styles.hideMobileSidebar]: !isOpen,
  });
  const headerWrapperClass = classNames(styles.wrapperHeading, {
    [styles.hideMobileHeader]: !isOpen,
  });
  const iconWrapperClass = classNames(styles.hideIcon, {
    [styles.openMobileIcon]: !isOpen,
  });
  return (
    <>
      <div className={styles.imageWrapper}>
        <PlaygroundImage />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.sidebarWrapper}>
          <div className={styles.filterWrapper}>
            <Filters location="mapPage" API_KEY={API_KEY} />
          </div>
          <div className={styles.mobileSidebarWrapper}>
            <div className={styles.mobileHeaderWrapper}>
              <div>
                <h1 className={headerWrapperClass}>Майданчики поблизу</h1>
              </div>
              <div className={iconWrapperClass}>
                <HideMark onClick={handleSliderShow} />
              </div>
            </div>
            <div className={sliderWrapperClass}>
              <PlaygroundsSlider playgrounds={playgrounds} />
            </div>
          </div>
          <div className={styles.scrollBox}>
            <div className={styles.listWrapper}>
              <PlaygroundsList playgrounds={playgrounds} />
            </div>
          </div>
        </div>
        <div className={styles.mapWrapper}>
          <Map
            apiKey={API_KEY}
            defaultZoom={DEFAULT_ZOOM}
            defaultCenter={DEFAULT_CENTER}
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            setChildClicked={setChildClicked}
            onLoad={onMapLoaded}
            onChange={onMapChanged}
          />
        </div>
      </div>
    </>
  );
}
