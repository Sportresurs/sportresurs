export default function placesInBounds(places, bounds) {
  if (bounds.sw.lng < bounds.ne.lng && bounds.sw.lat < bounds.ne.lat) {
    return places.filter(
      (courts) =>
        courts.longitude > bounds.sw.lng &&
        courts.longitude < bounds.ne.lng &&
        courts.latitude > bounds.sw.lat &&
        courts.latitude < bounds.ne.lat
    );
  }
  if (bounds.sw.lng > bounds.ne.lng && bounds.sw.lat > bounds.ne.lat) {
    return places.filter(
      (courts) =>
        courts.longitude < bounds.sw.lng &&
        courts.longitude > bounds.ne.lng &&
        courts.latitude < bounds.sw.lat &&
        courts.latitude > bounds.ne.lat
    );
  }
  return null;
}
