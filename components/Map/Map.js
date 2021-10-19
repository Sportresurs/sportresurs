import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Map.module.scss";
import MapMarkerWrapper from "../MapMarkerWrapper";
import courtDataFinder from "../../utils/courtDataFinder";

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
  setBounds,
  defaultZoom,
  defaultCenter,
  places,
  setChildClicked,
  childClicked,
  apiKey,
  searchPinCoords,
  setMarkerIndex,
  setSliderOpen,
}) {
  return (
    <div className={styles.mapWrapper}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        center={searchPinCoords}
        yesIWantToUseGoogleMapApiInternals
        options={options}
        margin={[10, 10, 10, 10]}
        onChange={(e) => {
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => {
          const proprsToMarker = courtDataFinder(place);
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
              typeOfCourt={proprsToMarker.type}
              district={proprsToMarker.district}
              isCourtMarker={true}
              indexMarker={i}
            />
          );
        })}
        {searchPinCoords && (
          <MapMarkerWrapper
            lat={Number(searchPinCoords.lat)}
            lng={Number(searchPinCoords.lng)}
            isCourtMarker={false}
            isClickable={false}
          />
        )}
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
};
