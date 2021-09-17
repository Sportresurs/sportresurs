import { useCallback, useRef, useState, useEffect } from "react";
import throttle from "lodash-es/throttle";
import styles from "../styles/MapPage.module.scss";
import Map from "../components/Map";

import data from "../utils/testData/courtDatabase";

const API_KEY = process.env.NEXT_PUBLIC_GMAP_API_KEY; // should be replaced to Sportresource key
const DEFAULT_COORDS = { lat: 49.841328, lng: 24.031592 };
// const DEFAULT_BOUNDS = {
//   sw: { lat: 49.83656742688311, lng: 24.02260123538207 },
//   ne: { lat: 49.84608810441344, lng: 24.04058276461791 },
// };
const DEFAULT_ZOOM = 15;

export default function MapPage() {
  const [places /* , setPlaces */] = useState(data.courtsDataBase);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  useEffect(() => {
    // console.log("filtred plc", filteredPlaces);
  }, [filteredPlaces]);
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
  // commented to passESlint check

  /*   const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState([]);
  const [rate, setRate] = useState("");
  const [district, setDistrict] = useState([]); */

  // function placesInBoundary() {
  //   if (bounds.sw.lng < bounds.ne.lng && bounds.sw.lat < bounds.ne.lat) {
  //     return places.filter(
  //       (courts) =>
  //         courts.longitude > bounds.sw.lng &&
  //         courts.longitude < bounds.ne.lng &&
  //         courts.latitude > bounds.sw.lat &&
  //         courts.latitude < bounds.ne.lat
  //     );
  //   }
  //   if (bounds.sw.lng > bounds.ne.lng && bounds.sw.lat > bounds.ne.lat) {
  //     return places.filter(
  //       (courts) =>
  //         courts.longitude < bounds.sw.lng &&
  //         courts.longitude > bounds.ne.lng &&
  //         courts.latitude < bounds.sw.lat &&
  //         courts.latitude > bounds.ne.lat
  //     );
  //   }
  //   return null;
  // }

  // useEffect(() => {
  //   setFilteredPlaces(placesInBoundary());
  //   placesInBoundary();
  //   setChildClicked(null);
  // }, [places, bounds, coordinates]);

  return (
    <>
      <div className={styles.wrapper}>
        {/* here we will need List component instead of placeholder
      IMPORTANT:
        it should recieve such props:
        places={filteredPlaces.length ? filteredPlaces : places} to render list of courts
        childClicked={childClicked} will need it to scroll court to chosed on the map
        isLoading={isLoading} // to know do we need loading spinner or not.

        For the filtering purpose
        type={type}
        setType={setType}
        rate={rate}
        setRate={setRate}
        district={district}
        setDistrict={setDistrict}
      */}
        <div className={styles.listPlaceholder} />
        <Map
          defaultZomm={DEFAULT_ZOOM}
          defaultCoords={DEFAULT_COORDS}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
          childClicked={childClicked}
          onLoad={onMapLoaded}
          onChange={onMapChanged}
          apiKey={API_KEY}
        />
      </div>
    </>
  );
}
