import colors from "../../styles/exportColorVars.module.scss";

const colorDescription = [
  { color: "green", hex: colors.colorAccentGreen },
  { color: "blue", hex: colors.colorAccentBlue },
  { color: "lilac", hex: colors.colorAccentPurple },
  { color: "orange", hex: colors.colorAccentOrange },
  { color: "yellow", hex: colors.colorAccentYellow },
  { color: "red", hex: colors.colorAccentRed },
  { color: "black", hex: colors.colorPrimaryDark },
];

const groundTypes = [
  { cirilicName: "гандбольний", latinName: "HandballCourt" },
  { cirilicName: "дитячий", latinName: "ChildCourt" },
  { cirilicName: "баскетбольний", latinName: "BasketballCourt" },
  { cirilicName: "тенісний", latinName: "TennisCourt" },
  { cirilicName: "футбольний", latinName: "FootballCourt" },
  { cirilicName: "волейбольний", latinName: "VolleyballCourt" },
  { cirilicName: "гімнастичний", latinName: "GymnasticCourt" },
  { cirilicName: "спортзал", latinName: "Gym" },
  { cirilicName: "стадіон", latinName: "Stadium" },
  { cirilicName: "басейн", latinName: "SwimmingPool" },
  { cirilicName: "скейтпарк", latinName: "SkatePark" },
  { cirilicName: "єдиноборства", latinName: "MartialArts" },
  { cirilicName: "воркаут", latinName: "Workout" },
  { cirilicName: "інклюзивний", latinName: "Inclusive" },
  { cirilicName: "з елементами інклюзії", latinName: "InclusiveElements" },
];

const courtsDistrict = [
  { district: "Шевченківський", latinName: "Shevchenkivskyi" },
  { district: "Франківський", latinName: "Frankivskyi" },
  { district: "Личаківський", latinName: "Lychakivskyi" },
  { district: "Залізничний", latinName: "Zaliznychnyi" },
  { district: "Сихівський", latinName: "Sykhivskyi" },
  { district: "Галицький", latinName: "Halitskyi" },
  { district: "Інший", latinName: "Another" },
];

const districts = [
  { label: "Шевченківський", value: "Шевченківський" },
  { label: "Франківський", value: "Франківський" },
  { label: "Личаківський", value: "Личаківський" },
  { label: "Залізничний", value: "Залізничний" },
  { label: "Сихівський", value: "Сихівський" },
  { label: "Галицький", value: "Галицький" },
  { label: "Інший", value: "Інший" },
];

const typeOptions = [
  { label: "Спортивний", value: "спортивний" },
  { label: "Дитячо-спортивний", value: "дитячо-спортивний" },
];
const accessOptions = [
  { label: "Безкоштовний", value: "безкоштовний" },
  { label: "Платний", value: "платний" },
];
const lightingOptions = [
  { label: "Є", value: true },
  { label: "Відсутнє", value: false },
];

export default {
  colorDescription,
  groundTypes,
  districts,
  courtsDistrict,
  accessOptions,
  typeOptions,
  lightingOptions,
};
