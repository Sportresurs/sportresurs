import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Supercluster from "supercluster";
import { useEffect, useState, useRef } from "react";
import styles from "./Map.module.scss";
import MapMarkerWrapper from "../MapMarkerWrapper";

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
  zoom,
  setZoom,
  center,
  defaultCenter,
  places,
  setChildClicked,
  childClicked,
  apiKey,
  searchPinCoords,
  setMarkerIndex,
  setSliderOpen,
  isSearchPinShow,
}) {
  const [clusters, setClusters] = useState([]);

  const superclusterRef = useRef(null);

  const updateClusters = () => {
    if (superclusterRef.current && places.length > 0) {
      const bounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
      };
      const cluster = superclusterRef.current.getClusters(
        [bounds.west, bounds.south, bounds.east, bounds.north],
        zoom
      );
      setClusters(cluster);
    }
  };

  useEffect(() => {
    const index = new Supercluster({
      radius: 50,
      minZoom: 11,
      maxZoom: 16,
    });

    const points = places.map((place) => ({
      type: "Feature",
      properties: { cluster: false, placeId: place.id, ...place },
      geometry: {
        type: "Point",
        coordinates: [Number(place.longitude), Number(place.latitude)],
      },
    }));

    index.load(points);
    superclusterRef.current = index;
    updateClusters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places, zoom, center]);

  return (
    <div className={styles.mapWrapper}>
      <GoogleMapReact
        options={(maps) => ({
          ...options,
          zoomControl: true,
          zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_CENTER,
          },
          fullscreenControlOptions: {
            position: maps.ControlPosition.RIGHT_CENTER,
          },
        })}
        bootstrapURLKeys={{ key: apiKey, language: "uk", region: "ua" }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        zoom={zoom}
        center={searchPinCoords || center}
        yesIWantToUseGoogleMapApiInternals
        margin={[10, 10, 10, 10]}
        onChange={(e) => {
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          if (e.zoom !== zoom) setZoom(e.zoom);
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {clusters.map((cluster, i) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster && pointCount >= 2) {
            return (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
                className={cx("clusterMarker")}
                style={{
                  width: `${Math.min(40 + pointCount * 5, 100)}px`,
                  height: `${Math.min(40 + pointCount * 5, 100)}px`,
                  backgroundColor: "rgba(0, 123, 255, 0.7)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "16px",
                }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    superclusterRef.current.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  setBounds({
                    ne: { lat: expansionZoom + 0.1, lng: expansionZoom + 0.1 },
                    sw: { lat: expansionZoom - 0.1, lng: expansionZoom - 0.1 },
                  });
                }}
              >
                {pointCount}
              </div>
            );
          }
          return (
            <MapMarkerWrapper
              setSliderOpen={setSliderOpen}
              setMarkerIndex={setMarkerIndex}
              className={cx("markerWrapper", {
                selected: Number(childClicked) === cluster.properties.placeId,
              })}
              lat={latitude}
              lng={longitude}
              key={cluster.properties.placeId}
              courtPurpose={cluster.properties.Purposes}
              district={cluster.properties.District}
              isUnbroken={cluster.properties.Types.find(
                (el) => el.name === "Unbroken Sport"
              )}
              isCourtMarker={true}
              indexMarker={i}
            />
          );
        })}
        {searchPinCoords && isSearchPinShow && (
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
  setBounds: PropTypes.func.isRequired,
  defaultCenter: PropTypes.object.isRequired,
  searchPinCoords: PropTypes.object,
  defaultZomm: PropTypes.number,
  places: PropTypes.array.isRequired,
  setChildClicked: PropTypes.func,
  childClicked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setMarkerIndex: PropTypes.func,
  setSliderOpen: PropTypes.func,
  apiKey: PropTypes.string.isRequired,
};
