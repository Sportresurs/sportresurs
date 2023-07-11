// dummy function, transforms Masculine to Feminine for only 1 case
export function changeGender(string) {
  if (!string || typeof string !== "string") {
    return "";
  }
  const regexp = new RegExp("ий", "g");
  return string.replace(regexp, "а");
}
export function capitalize(string) {
  if (!string || typeof string !== "string") {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}
