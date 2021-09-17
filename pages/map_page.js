import { useCallback, useRef, useState, useEffect } from "react";
import throttle from "lodash-es/throttle";
import styles from "../styles/MapPage.module.scss";
import Map from "../components/Map";

import data from "../utils/testData/courtDatabase";

const API_KEY = process.env.NEXT_PUBLIC_GMAP_API_KEY;
const DEFAULT_CENTER = { lat: 49.841328, lng: 24.031592 };
const DEFAULT_ZOOM = 15;

export default function MapPage() {
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

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.listPlaceholder} />
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
    </>
  );
}
