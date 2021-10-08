import Marker from "../Marker";

export default function MapMarkerWrapper({
  lat,
  lng,
  key,
  typeOfCourt,
  district,
  className,
  isCourtMarker,
  setMarkerIndex,
  indexMarker,
  setSliderOpen,
}) {
  const index = indexMarker;
  return (
    <div
      onClick={() => {
        setSliderOpen(true);
        setMarkerIndex(index);
      }}
      lat={lat}
      lng={lng}
      key={key}
      className={className}
      role="button"
      tabIndex={0}
    >
      <Marker
        typeOfCourt={typeOfCourt}
        district={district}
        isCourtMarker={isCourtMarker}
      />
    </div>
  );
}
