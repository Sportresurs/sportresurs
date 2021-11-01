const validation = {
  nameValidation:
    /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ'][a-zA-Z-а-яА-ЯёЁЇїІіЄєҐґ' ]+[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ']?$/,
  phoneValidation: /^(\+38)?(38)?0[5-9]{1}[0-9]{8}$/,
  numberValidation: /^[0-9]+$/,
  latitudeValidation:
    /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
  longitudeValidation:
    /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
  areaValidation: /^$|^[0-9]{1,4}$/,
  emailValidation:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  getErrorMessage(rule, option) {
    switch (rule) {
      case "name":
        return "Будь ласка, введіть валідне ім'я.";
      case "phone":
        return "Введіть, будь ласка, номер у форматі +380XX XXX XX XX.";
      case "number":
        return "Будь ласка, введіть валідний номер.";
      case "latitude":
        return "Будь ласка, введіть валідну широту.";
      case "longitude":
        return "Будь ласка, введіть валідну довготу.";
      case "area":
        return "Будь ласка, введіть валідний метраж.";
      case "max":
        return `Кількість символів не повинно перевищувати ${option}.`;
      case "email":
        return "Будь ласка, введіть валідний email.";
      default:
        return "Заповніть, будь ласка, це поле.";
    }
  },
};
export default validation;
