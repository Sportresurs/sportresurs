import Marker from "../Marker";

export default function MapMarkerWrapper({
  lat,
  lng,
  key,
  typeOfCourt,
  bgColor,
  className,
}) {
  return (
    <div lat={lat} lng={lng} key={key} className={className}>
      <Marker typeOfCourt={typeOfCourt} bgColor={bgColor} />
    </div>
  );
}
