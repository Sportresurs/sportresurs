import districtColors from "./testData/districtColors";

const getDistrictColor = (region) =>
  districtColors.find((item) => item.district === region).color;

export default getDistrictColor;
