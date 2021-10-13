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
  isClickable = true,
}) {
  const index = indexMarker;
  return (
    <div
      onClick={() => {
        if (isClickable) {
          setSliderOpen(true);
          setMarkerIndex(index);
        }
        return null;
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
