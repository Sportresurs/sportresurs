import data from "./testData/testArrs";

export default function courtDataFinder(court) {
  if (court.destination.length > 1) {
    const districtLatin = data.courtsDistrict.find(
      (el) => el.district === court.district
    ).latinName;
    return { district: districtLatin, type: "MultiSelectCourt" };
  }
  if (court.destination.length === 0) {
    const districtLatin = data.courtsDistrict.find(
      (el) => el.district === court.district
    ).latinName;

    return { district: districtLatin, type: "WithoutTypeCourt" };
  }
  if (court.destination.length === 1) {
    const districtLatin = data.courtsDistrict.find(
      (el) => el.district === court.district
    ).latinName;
    const typeLatin = data.groundTypes.find(
      (el) => el.cirilicName === court.destination
    );
    return { district: districtLatin, type: typeLatin };
  }
  return { district: "Another", type: "WithoutTypeCourt" };
}
