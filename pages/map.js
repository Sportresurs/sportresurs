import React, { useContext, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import classNames from "classnames";
import Map from "../components/Map";
import PlaygroundsSlider from "../components/PlaygroundsSlider";
import PlaygroundsList from "../components/PlaygroundsList";
import Filters from "../components/Filters";
import styles from "../styles/MapPage.module.scss";
import PlaygroundImage from "../public/svg/mapBackground.svg";
import HideMark from "../public/svg/hideSliderArrow.svg";
import { Context } from "../context";
import placesInBounds from "../utils/placesInBounds";
import {
  DEFAULT_CENTER,
  DEFAULT_BOUNDS,
  DEFAULT_ZOOM,
} from "../utils/mapStartPositionData";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // !! should be replaced to Sportresource key

export default function MapPage({ playgrounds }) {
  const {
    center,
    setCenter,
    areas,
    coordinates,
    handleCoordinates,
    zoom,
    setZoom,
    districtCenter,
    setDistrictCenter,
    isSearchPinShow,
  } = useContext(Context);

  const [isLoaded, setIsLoaded] = useState(false);
  const [searchPinCoords, setSearchPinCoords] = useState(coordinates);
  const [childClicked, setChildClicked] = useState(null);
  const [markerIndex, setMarkerIndex] = useState(0);
  const [sliderOpen, setSliderOpen] = useState(true);
  const [bounds, setBounds] = useState(DEFAULT_BOUNDS);

  useEffect(() => window.google && setIsLoaded(true), []);
  useEffect(
    () => () => {
      handleCoordinates(null);
      setDistrictCenter(null);
      setZoom(15);
      setCenter(null);
    },
    []
  );

  const getPlaygroundsInBounds = useMemo(
    () => placesInBounds(areas, bounds),
    [bounds, areas]
  );

  const handleSliderShow = () => {
    setSliderOpen((prevState) => !prevState);
  };
  const sidebarWrapperClass = classNames(styles.mobileSidebarWrapper, {
    [styles.hideMobileSidebar]: !sliderOpen,
  });
  const sliderWrapperClass = classNames(styles.sliderWrapper, {
    [styles.hideMobileSlider]: !sliderOpen,
  });
  const iconWrapperClass = classNames(styles.hideIcon, {
    [styles.openMobileIcon]: !sliderOpen,
  });

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        /* strategy="beforeInteractive" */
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
      {isLoaded && (
        <>
          <div className={styles.imageWrapper}>{<PlaygroundImage />}</div>
          <div className={styles.wrapper}>
            <div className={styles.sidebarWrapper}>
              <div className={styles.filterWrapper}>
                <Filters
                  bounds={bounds}
                  areas={playgrounds}
                  location="mapPage"
                  API_KEY={API_KEY}
                  setSearchPinCoords={setSearchPinCoords}
                  handleCoordinates={setSearchPinCoords}
                />
              </div>
              <div className={sidebarWrapperClass}>
                <div className={styles.sidebarContainer}>
                  <div className={styles.mobileHeaderWrapper}>
                    <h1 className={styles.wrapperHeading}>
                      ???????????????????? ??????????????
                    </h1>
                    <div
                      className={iconWrapperClass}
                      onClick={handleSliderShow}
                    >
                      <HideMark />
                    </div>
                  </div>
                  <div className={sliderWrapperClass}>
                    <PlaygroundsSlider
                      setChildClicked={setChildClicked}
                      markerIndex={markerIndex}
                      playgrounds={getPlaygroundsInBounds}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.scrollBox}>
                <div className={styles.listWrapper}>
                  <PlaygroundsList
                    playgrounds={getPlaygroundsInBounds}
                    childClicked={childClicked}
                    setChildClicked={setChildClicked}
                  />
                </div>
              </div>
            </div>
            <div className={styles.mapWrapper}>
              <Map
                setBounds={setBounds}
                apiKey={API_KEY}
                defaultZoom={DEFAULT_ZOOM}
                zoom={zoom}
                center={districtCenter || center}
                defaultCenter={DEFAULT_CENTER}
                places={getPlaygroundsInBounds}
                childClicked={childClicked}
                setChildClicked={setChildClicked}
                searchPinCoords={searchPinCoords}
                isSearchPinShow={isSearchPinShow}
                setMarkerIndex={setMarkerIndex}
                setSliderOpen={setSliderOpen}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/areas`);
  const data = await res.json();
  return {
    props: {
      playgrounds: data.areas,
    },
  };
}
