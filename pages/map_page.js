import { useEffect, useState } from "react";
import styles from "../styles/MapPage.module.scss";
import Map from "../components/Map";
import placesInBounds from "../utils/placesInBounds";
import data from "../utils/testData/courtDatabase";

const API_KEY = "AIzaSyCQpQm5NpH4H9sGBd66F8UzhPuAsyFEZTA"; // !! should be replaced to Sportresource key
const DEFAULT_COORDS = { lat: 49.841328, lng: 24.031592 };
const DEFAULT_BOUNDS = {
  sw: { lat: 49.83656742688311, lng: 24.02260123538207 },
  ne: { lat: 49.84608810441344, lng: 24.04058276461791 },
};
const DEFAULT_ZOOM = 15;

export default function MapPage() {
  const [places /* setPlaces */] = useState(data.courtsDataBase); // need when DB will be ready
  const [coordinates, setCoordinates] = useState(DEFAULT_COORDS);
  const [bounds, setBounds] = useState(DEFAULT_BOUNDS);
  const [zoom, setZoom] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  /*  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState([]);
  const [rate, setRate] = useState(null);
  const [district, setDistrict] = useState([]); */
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    setFilteredPlaces(placesInBounds(places, bounds));
  }, [places, bounds, coordinates]);

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
        <div className={styles.listPlaceholder}></div>
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          defaultZomm={DEFAULT_ZOOM}
          zoom={zoom}
          setZoom={setZoom}
          defaultCoords={DEFAULT_COORDS}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
          childClicked={childClicked}
          apiKey={API_KEY}
        ></Map>
      </div>
    </>
  );
}
