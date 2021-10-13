import data from "./testData/testArrs";

export default function courtDataFinder(court) {
  function getDistrictLatinName() {
    return data.courtsDistrict.find((el) => el.district === court.district)
      .latinName;
  }
  function getTypeLatinName() {
    return data.groundTypes.find(
      (el) => el.cirilicName === court.Purposes[0].title
    ).latinName;
  }
  const districtLatin = getDistrictLatinName();

  if (court.Purposes.length > 1) {
    return { district: districtLatin, type: "MultiSelectCourt" };
  }
  if (court.Purposes.length === 0) {
    return { district: districtLatin, type: "WithoutTypeCourt" };
  }
  if (court.Purposes.length === 1) {
    const typeLatin = getTypeLatinName();
    return { district: districtLatin, type: typeLatin };
  }
  return { district: "Another", type: "WithoutTypeCourt" };
}
