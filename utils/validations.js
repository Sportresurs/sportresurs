const validation = {
  nameValidation:
    /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ'][a-zA-Z-а-яА-ЯёЁЇїІіЄєҐґ' ]+[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ']?$/,
  phoneValidation: /^(\+38)?(38)?0[5-9]{1}[0-9]{8}$/,
  numberValidation: /^[0-9]+$/,
  latitudeValidation:
    /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
  longitudeValidation:
    /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
  areaValidation: /^[0-9]{1,4}$/,
  getErrorMessage(rule, option) {
    let errorMessage = "";
    switch (rule) {
      case "name":
        errorMessage = "Будь ласка, введіть валідне ім'я";
        break;
      case "phone":
      case "number":
        errorMessage = "Будь ласка, введіть валідний номер";
        break;
      case "latitude":
        errorMessage = "Будь ласка, введіть валідну широту";
        break;
      case "longitude":
        errorMessage = "Будь ласка, введіть валідну довготу";
        break;
      case "area":
        errorMessage = "Будь ласка, введіть валідний метраж";
        break;
      case "max":
        errorMessage = `Кількість символів не повинно перевищувати ${option}`;
        break;
      default:
        errorMessage = "Поле обов'язково до заповнення";
        break;
    }
    return errorMessage;
  },
};
export default validation;
