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
    let errorMessage = "";
    switch (rule) {
      case "name":
        errorMessage = "Будь ласка, введіть валідне ім'я.";
        break;
      case "phone":
        errorMessage = "Введіть, будь ласка, номер у форматі +380XX XXX XX XX.";
        break;
      case "number":
        errorMessage = "Будь ласка, введіть валідний номер.";
        break;
      case "latitude":
        errorMessage = "Будь ласка, введіть валідну широту.";
        break;
      case "longitude":
        errorMessage = "Будь ласка, введіть валідну довготу.";
        break;
      case "area":
        errorMessage = "Будь ласка, введіть валідний метраж.";
        break;
      case "max":
        errorMessage = `Кількість символів не повинно перевищувати ${option}.`;
        break;
      case "email":
        errorMessage = "Будь ласка, введіть валідний email.";
        break;
      default:
        errorMessage = "Заповніть, будь ласка, це поле.";
        break;
    }
    return errorMessage;
  },
};
export default validation;
