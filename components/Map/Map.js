import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Map.module.scss";
import MapMarkerWrapper from "../MapMarkerWrapper";
import types from "../../utils/testData/testArrs";

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

const cx = classNames.bind(styles);

export default function Map({
  defaultZoom,
  defaultCenter,
  places,
  setChildClicked,
  childClicked,
  apiKey,
  onLoad,
  onChange,
  setMarkerIndex,
  setSliderOpen,
}) {
  // please ignore this function while revieweing as it's temporary until new pins will be created by designer and added to Marker component
  function courtDataFinder(destination) {
    if (destination.length > 1) {
      const multiPin = { color: "lilac", latinName: "Tennis" };
      return multiPin;
    }
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
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        options={options}
        margin={[100, 100, 100, 100]}
        onChange={handleChange}
        onDrag={handleChange}
        onGoogleApiLoaded={handleApiLoaded}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => {
          const proprsToMarker = courtDataFinder(place.destination);
          return (
            <MapMarkerWrapper
              setSliderOpen={setSliderOpen}
              setMarkerIndex={setMarkerIndex}
              className={cx("markerWrapper", {
                selected: Number(childClicked) === place.id,
              })}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={place.id}
              indexMarker={i}
              typeOfCourt={proprsToMarker.latinName}
              bgColor={proprsToMarker.color}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

Map.propTypes = {
  defaultCenter: PropTypes.object.isRequired,
  defaultZomm: PropTypes.number,
  places: PropTypes.array.isRequired,
  setChildClicked: PropTypes.func,
  childClicked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  apiKey: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
