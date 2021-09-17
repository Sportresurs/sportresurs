import { forwardRef } from "react";
import GoogleMapReact from "google-map-react";
import classNames from "classnames/bind";
import styles from "./Map.module.scss";
import Marker from "../Marker";
import types from "../../utils/testData/testArrs";

const cx = classNames.bind(styles);
function CustomMap(
  {
    defaultZomm,
    defaultCoords,
    coordinates,
    places,
    setChildClicked,
    childClicked,
    apiKey,
    onLoad,
    onChange,
  },
  ref
) {
  const options = {
    minZoom: 11,
    maxZoom: 20,
    restriction: {
      latLngBounds: {
        north: 49.96325058667949,
        south: 49.7223633490448,
        east: 24.210497138916054,
        west: 23.851724861084023,
      },
    },
  };
  // please ignore this function while revieweing as it's temporary until new pins will be created by designer and added to Marker component
  function courtDataFinder(destination) {
    // если мультипин
    if (destination.length > 1) {
      const multiPin = { color: "lilac", latinName: "Tennis" };
      return multiPin;
    }
    // если нету призначення
    if (destination.length === 0) {
      const noDestination = { color: "red", latinName: "Handball" };
      return noDestination;
    }
    const matchedType = types.groundTypes.find(
      (item) => item.cirilicName === destination[0]
    );

    return matchedType;
  }
  const handleApiLoaded = ({ map }) => {
    if (onLoad) {
      onLoad(map);
    }
  };
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.mapWrapper}>
      <GoogleMapReact
        ref={ref}
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCoords}
        center={coordinates}
        defaultZoom={defaultZomm}
        yesIWantToUseGoogleMapApiInternals
        /* margin={[50, 50, 50, 50]} */
        options={options}
        onChange={handleChange}
        onDrag={handleChange}
        onGoogleApiLoaded={handleApiLoaded}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place) => {
          const proprsToMarker = courtDataFinder(place.destination);
          return (
            <div
              className={cx("markerWrapper", {
                selected: Number(childClicked) === place.id,
              })}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={place.id}
            >
              <Marker
                typeOfCourt={proprsToMarker.latinName}
                bgColor={proprsToMarker.color}
              />
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default forwardRef(CustomMap);
