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

const districtColors = [
  { district: "Шевченківський", color: "green" },
  { district: "Франківський", color: "blue" },
  { district: "Личаківський", color: "orange" },
  { district: "Залізничний", color: "lilac" },
  { district: "Сихівський", color: "yellow" },
  { district: "Галицький", color: "red" },
  { district: "Інший", color: "black" },
];

const courtInfo = {
  id: "1212131",
  district: "Залізничний",
  address: "вул. Тернопільська, 13а",
  courtNumber: 25,
  rating: 4,
  image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
};

const topCourts = [
  {
    id: "5654465",
    district: "Франківський",
    address: "вул. Васильківська, 10",
    courtNumber: 10,
    rating: 4,
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "165464",
    district: "Залізничний",
    address: "вул. Тернопільська, 13а",
    courtNumber: 25,
    rating: 4.5,
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1289661",
    district: "Галицький",
    address: "вул. Кукушка-їде, 10",
    courtNumber: 55,
    rating: 2.5,
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "187131",
    district: "Сихівський",
    address: "вул. Незалежності, 2",
    courtNumber: 25,
    rating: 3.5,
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
];

const playgroundsList = [
  {
    id: "5654f465",
    district: "Франківський",
    address: "вул. Васильківська, 10",
    courtNumber: 10,
    rating: 4,
    color: "blue",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "16g5464",
    district: "Залізничний",
    address: "вул. Тернопільська, 13а",
    courtNumber: 25,
    rating: 4.5,
    color: "lilac",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1289g661",
    district: "Галицький",
    address: "вул. Кукушка-їде, 10",
    courtNumber: 55,
    rating: 2.5,
    color: "red",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "18d7131",
    district: "Сихівський",
    address: "вул. Незалежності, 2",
    courtNumber: 25,
    rating: 3.5,
    color: "yellow",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "5654jg465",
    district: "Франківський",
    address: "вул. Васильківська, 10",
    courtNumber: 10,
    rating: 4,
    color: "blue",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "16kjh5464",
    district: "Залізничний",
    address: "вул. Тернопільська, 13а",
    courtNumber: 25,
    rating: 4.5,
    color: "lilac",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1289te661",
    district: "Галицький",
    address: "вул. Кукушка-їде, 10",
    courtNumber: 55,
    rating: 2.5,
    color: "red",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "187h131",
    district: "Сихівський",
    address: "вул. Незалежності, 2",
    courtNumber: 25,
    rating: 3.5,
    color: "yellow",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "565nv4465",
    district: "Франківський",
    address: "вул. Васильківська, 10",
    courtNumber: 10,
    rating: 4,
    color: "blue",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "16546ye4",
    district: "Залізничний",
    address: "вул. Тернопільська, 13а",
    courtNumber: 25,
    rating: 4.5,
    color: "lilac",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "12896tet61",
    district: "Галицький",
    address: "вул. Кукушка-їде, 10",
    courtNumber: 55,
    rating: 2.5,
    color: "red",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1871tyr31",
    district: "Сихівський",
    address: "вул. Незалежності, 2",
    courtNumber: 25,
    rating: 3.5,
    color: "yellow",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "5654htr65",
    district: "Франківський",
    address: "вул. Васильківська, 10",
    courtNumber: 10,
    rating: 4,
    color: "blue",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "165hk464",
    district: "Залізничний",
    address: "вул. Тернопільська, 13а",
    courtNumber: 25,
    rating: 4.5,
    color: "lilac",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "12549661",
    district: "Галицький",
    address: "вул. Кукушка-їде, 10",
    courtNumber: 55,
    rating: 2.5,
    color: "red",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1871fgh31",
    district: "Сихівський",
    address: "вул. Незалежності, 2",
    courtNumber: 25,
    rating: 3.5,
    color: "yellow",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "565mm4465",
    district: "Франківський",
    address: "вул. Васильківська, 10",
    courtNumber: 10,
    rating: 4,
    color: "blue",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1654bm64",
    district: "Залізничний",
    address: "вул. Тернопільська, 13а",
    courtNumber: 25,
    rating: 4.5,
    color: "lilac",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "12sf89661",
    district: "Галицький",
    address: "вул. Кукушка-їде, 10",
    courtNumber: 55,
    rating: 2.5,
    color: "red",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1871se31",
    district: "Сихівський",
    address: "вул. Незалежності, 2",
    courtNumber: 25,
    rating: 3.5,
    color: "yellow",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "565tw465",
    district: "Франківський",
    address: "вул. Васильківська, 10",
    courtNumber: 10,
    rating: 4,
    color: "blue",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1wet65464",
    district: "Залізничний",
    address: "вул. Тернопільська, 13а",
    courtNumber: 25,
    rating: 4.5,
    color: "lilac",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "128yr9661",
    district: "Галицький",
    address: "вул. Кукушка-їде, 10",
    courtNumber: 55,
    rating: 2.5,
    color: "red",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
  {
    id: "1871u31",
    district: "Сихівський",
    address: "вул. Незалежності, 2",
    courtNumber: 25,
    rating: 3.5,
    color: "yellow",
    type: "спортивний",
    purpose: "футбольний",
    area: "3000 м. кв.",
    covering: "штучна трава",
    access: "безкоштовний",
    opening: "00:00 - 24:00",
    lighting: "відсутнє",
    additionally: "фут. ворота, огорожа, покриття",
    image: "https://i.ibb.co/dGJcNGD/court-Placeholder.jpg",
  },
];

const districts = [
  { label: "Шевченківський", value: "Шевченківський" },
  { label: "Франківський", value: "Франківський" },
  { label: "Личаківський", value: "Личаківський" },
  { label: "Залізничний", value: "Залізничний" },
  { label: "Сихівський", value: "Сихівський" },
  { label: "Галицький", value: "Галицький" },
  { label: "Інший", value: "Інший" },
  /*   "Шевченківський",
  "Франківський",
  "Личаківський",
  "Залізничний",
  "Сихівський",
  "Галицький",
  "Інший", */
];

const courtsType = [
  "Спортивний",
  "Дитячий",
  "Баскетбольний",
  "Тенісний",
  "Футбольний",
  "Стріт воркаут",
  "Скейт-майданчик",
  "Бігові доріжки",
];

export default {
  colorDescription,
  courtInfo,
  districtColors,
  topCourts,
  playgroundsList,
  districts,
  courtsType,
};
