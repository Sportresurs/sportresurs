import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Script from "next/script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import classNames from "classnames/bind";
import Marker from "./marker";
import Input from "../../Input";
import { DEFAULT_CENTER } from "../../../utils/mapStartPositionData";
import styles from "../AdminPlaygroundModalContent.module.scss";

const { GOOGLE_MAPS_API_KEY } = process.env;
const cx = classNames.bind(styles);

const GoogleMapPicker = ({ formik }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: parseFloat(formik.values.latitude) || 49.841328,
    lng: parseFloat(formik.values.longitude) || 24.031592,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);

    setMarkerPosition(latLng);
    formik.setFieldValue("latitude", latLng.lat.toFixed(6));
    formik.setFieldValue("longitude", latLng.lng.toFixed(6));
    formik.setFieldValue("address", address);
  };

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

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}&language=uk&region=UA`}
        onLoad={() => setIsLoaded(true)}
      />

      {isLoaded && (
        <>
          <PlacesAutocomplete
            value={formik.values.address || ""}
            onChange={(value) => formik.setFieldValue("address", value)}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <Input
                  {...getInputProps({
                    placeholder: "Введіть назву вулиці",
                    className: styles.input,
                  })}
                  label="Адреса"
                  labelSize="smallLabel"
                  inputSize="form"
                />
                {suggestions.length >= 1 && (
                  <div className={cx("autocomplete")}>
                    {suggestions.map((suggestion) => (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: cx("autocompleteItem", {
                            hover: suggestion.active,
                          }),
                        })}
                        key={suggestion.placeId}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </PlacesAutocomplete>

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
                gestureHandling: "auto",
                draggableCursor: "pointer",
                draggingCursor: "move",
                mapTypeId: "roadmap",
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
      )}
    </>
  );
};

export default GoogleMapPicker;
