export default function getPlacesInBounds(places, bounds) {
  if (!places || !bounds || !bounds.sw || !bounds.ne) {
    return [];
  }
  
  if (bounds.sw.lng < bounds.ne.lng && bounds.sw.lat < bounds.ne.lat) {
    return places.filter(
      (place) =>
        Number(place.longitude) > bounds.sw.lng &&
        Number(place.longitude) < bounds.ne.lng &&
        Number(place.latitude) > bounds.sw.lat &&
        Number(place.latitude) < bounds.ne.lat
    );
  }
  if (bounds.sw.lng > bounds.ne.lng && bounds.sw.lat > bounds.ne.lat) {
    return places.filter(
      (place) =>
        Number(place.longitude) < bounds.sw.lng &&
        Number(place.longitude) > bounds.ne.lng &&
        Number(place.latitude) < bounds.sw.lat &&
        Number(place.latitude) > bounds.ne.lat
    );
  }
  return [];
}
