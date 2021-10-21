export default function placesInBounds(places, bounds) {
  if (bounds.sw.lng < bounds.ne.lng && bounds.sw.lat < bounds.ne.lat) {
    return places.filter(
      (courts) =>
        Number(courts.longitude) > bounds.sw.lng &&
        Number(courts.longitude) < bounds.ne.lng &&
        Number(courts.latitude) > bounds.sw.lat &&
        Number(courts.latitude) < bounds.ne.lat
    );
  }
  if (bounds.sw.lng > bounds.ne.lng && bounds.sw.lat > bounds.ne.lat) {
    return places.filter(
      (courts) =>
        Number(courts.longitude) < bounds.sw.lng &&
        Number(courts.longitude) > bounds.ne.lng &&
        Number(courts.latitude) < bounds.sw.lat &&
        Number(courts.latitude) > bounds.ne.lat
    );
  }
  return 1;
}
