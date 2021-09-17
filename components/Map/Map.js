import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Map.module.scss";
import Marker from "../Marker";
import types from "../../utils/testData/testArrs";

const cx = classNames.bind(styles);

export default function Map({
  setCoordinates,
  setBounds,
  defaultZomm,
  zoom,
  setZoom,
  defaultCoords,
  coordinates,
  places,
  setChildClicked,
  childClicked,
  apiKey,
}) {
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

  return (
    <div className={styles.mapWrapper}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCoords}
        center={coordinates}
        defaultZoom={defaultZomm}
        zoom={zoom}
        margin={[50, 50, 50, 50]}
        options={options}
        onChange={(e) => {
          setZoom(e.zoom);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        boun
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

Map.propTypes = {
  setCoordinates: PropTypes.func.isRequired,
  setBounds: PropTypes.func.isRequired,
  defaultZomm: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  setZoom: PropTypes.func,
  defaultCoords: PropTypes.array.isRequired,
  coordinates: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  setChildClicked: PropTypes.func,
  childClicked: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
};
