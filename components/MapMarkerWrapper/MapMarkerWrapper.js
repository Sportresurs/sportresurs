import Marker from "../Marker";

export default function MapMarkerWrapper({
  lat,
  lng,
  key,
  courtPurpose = [],
  district = {},
  className,
  isCourtMarker,
  setMarkerIndex,
  indexMarker,
  setSliderOpen,
  isClickable = true,
  isUnbroken,
}) {
  const index = indexMarker;
  return (
    <div
      // eslint-disable-next-line react/no-unknown-property
      lat={lat}
      // eslint-disable-next-line react/no-unknown-property
      lng={lng}
      onClick={() => {
        if (isClickable) {
          setSliderOpen(true);
          setMarkerIndex(index);
        }
        return null;
      }}
      key={key}
      className={className}
      role="button"
      tabIndex={0}
      suppressHydrationWarning
    >
      <Marker
        courtPurpose={courtPurpose}
        district={district}
        isCourtMarker={isCourtMarker}
        isUnbroken={isUnbroken}
      />
    </div>
  );
}
