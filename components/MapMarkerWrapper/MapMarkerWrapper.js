import Marker from "../Marker";

export default function MapMarkerWrapper({
  lat,
  lng,
  key,
  typeOfCourt,
  bgColor,
  className,
  setMarkerIndex,
  indexMarker,
}) {
  const id = indexMarker;
  return (
    <div
      onClick={() => setMarkerIndex(id)}
      lat={lat}
      lng={lng}
      key={key}
      className={className}
    >
      <Marker typeOfCourt={typeOfCourt} bgColor={bgColor} />
    </div>
  );
}
