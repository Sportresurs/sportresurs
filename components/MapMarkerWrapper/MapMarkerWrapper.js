import Marker from "../Marker";

export default function MapMarkerWrapper({
  lat,
  lng,
  key,
  typeOfCourt,
  district,
  className,
  isCourtMarker,
}) {
  return (
    <div lat={lat} lng={lng} key={key} className={className}>
      <Marker
        typeOfCourt={typeOfCourt}
        district={district}
        isCourtMarker={isCourtMarker}
      />
    </div>
  );
}
