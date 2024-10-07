/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import classNames from "classnames";
import { useRouter } from "next/router";
import Map from "../components/Map";
import PlaygroundsSlider from "../components/PlaygroundsSlider";
import PlaygroundsList from "../components/PlaygroundsList";
import Filters from "../components/Filters";
import styles from "../styles/MapPage.module.scss";
import PlaygroundImage from "../public/svg/mapBackground.svg";
import HideMark from "../public/svg/hideSliderArrow.svg";
import { Context } from "../context";
import getPlacesInBounds from "../utils/getPlacesInBounds";
import {
  DEFAULT_CENTER,
  DEFAULT_BOUNDS,
  DEFAULT_ZOOM,
} from "../utils/mapStartPositionData";
import Checkbox from "../components/Checkbox/Checkbox";

const { GOOGLE_MAPS_API_KEY } = process.env;

export default function MapPage({ areas }) {
  const {
    center,
    setCenter,
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
  const [isChecked, setCheckBox] = useState(false);
  const router = useRouter();

  useEffect(() => window.google && setIsLoaded(true), []);
  useEffect(
    () => () => {
      handleCoordinates(null);
      setDistrictCenter(null);
      setZoom(15);
      setCenter({ lat: 49.841328, lng: 24.031592 });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (isChecked) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, type: "Unbroken Sport,Unbroken" },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: {},
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const playgroundsInBounds = useMemo(
    () => getPlacesInBounds(areas, bounds),
    [areas, bounds]
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
        src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}&language=uk&region=UA`}
        strategy="lazyOnload"
        async
        defer
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
                  location="mapPage"
                  handleCoordinates={setSearchPinCoords}
                  setSearchPinCoords={setSearchPinCoords}
                  router={router}
                />
              </div>
              <div className={styles.checkWrap}>
                <Checkbox
                  text="Показати лише UNBROKEN"
                  state={isChecked}
                  changeState={setCheckBox}
                />
              </div>
              <div className={sidebarWrapperClass}>
                <div className={styles.sidebarContainer}>
                  <div className={styles.mobileHeaderWrapper}>
                    <h1 className={styles.wrapperHeading}>
                      Спортивна та дитяча інфраструктура поблизу
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
                      playgrounds={playgroundsInBounds}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.scrollBox}>
                <div className={styles.listWrapper}>
                  <PlaygroundsList
                    playgrounds={playgroundsInBounds}
                    childClicked={childClicked}
                    setChildClicked={setChildClicked}
                  />
                </div>
              </div>
            </div>
            <div className={styles.mapWrapper}>
              <Map
                setBounds={setBounds}
                apiKey={GOOGLE_MAPS_API_KEY}
                defaultZoom={DEFAULT_ZOOM}
                zoom={zoom}
                center={districtCenter || center}
                defaultCenter={DEFAULT_CENTER}
                places={areas}
                childClicked={childClicked}
                setChildClicked={setChildClicked}
                searchPinCoords={searchPinCoords}
                isSearchPinShow={isSearchPinShow}
                setMarkerIndex={setMarkerIndex}
                setSliderOpen={setSliderOpen}
                setZoom={setZoom}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const {
      purposeOfAreas = null,
      districts = null,
      rating = null,
      type = null,
    } = context.query;

    const url = new URL(`${process.env.NEXT_PUBLIC_HOST}api/areas/all`);

    if (purposeOfAreas) url.searchParams.set("purposeOfAreas", purposeOfAreas);
    if (districts) url.searchParams.set("districts", districts);
    if (rating) url.searchParams.set("rating", rating);
    if (type) url.searchParams.set("type", type);

    const AreasResponse = await fetch(url.toString());

    const data = await AreasResponse.json();

    return {
      props: {
        ...data,
      },
    };
  } catch (error) {
    throw new Error(`Problem fetch page content ${error}`);
  }
}
