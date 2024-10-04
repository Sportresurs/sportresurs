import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import Input from "../../Input";
import { DEFAULT_CENTER } from "../../../utils/mapStartPositionData";
import styles from "../AdminPlaygroundModalContent.module.scss";

const { GOOGLE_MAPS_API_KEY } = process.env;

const GoogleMapPicker = ({ formik }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: parseFloat(formik.values.latitude) || 49.841328,
    lng: parseFloat(formik.values.longitude) || 24.031592,
  });

  const handleMarkerDragEnd = ({ lat, lng }) => {
    setMarkerPosition({ lat, lng });
    formik.setFieldValue("latitude", lat.toFixed(6));
    formik.setFieldValue("longitude", lng.toFixed(6));
  };

  const handleMapClick = ({ lat, lng }) => {
    setMarkerPosition({ lat, lng });
    formik.setFieldValue("latitude", lat.toFixed(6));
    formik.setFieldValue("longitude", lng.toFixed(6));
  };

  return (
    <>
      <div style={{ height: "400px", width: "100%", marginBottom: "20px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: GOOGLE_MAPS_API_KEY,
            language: "uk",
            region: "ua",
            libraries: ["places"],
          }}
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={14}
          center={markerPosition}
          onClick={handleMapClick}
          options={{
            fullscreenControl: false,
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
            gestureHandling: "auto",
            draggableCursor: "pointer",
            draggingCursor: "move",
          }}
        >
          {markerPosition && (
            <Marker
              lat={markerPosition.lat}
              lng={markerPosition.lng}
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </GoogleMapReact>
      </div>

      <Input
        label="Широта"
        value={formik.values.latitude}
        disabled
        labelSize="smallLabel"
        inputSize="form"
        className={styles.input}
      />
      <Input
        label="Довгота"
        value={formik.values.longitude}
        disabled
        labelSize="smallLabel"
        inputSize="form"
        className={styles.input}
      />
    </>
  );
};

export default GoogleMapPicker;
