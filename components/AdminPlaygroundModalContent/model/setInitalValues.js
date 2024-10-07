import OPTIONS from "./constant";

const setInitialValues = ({
  area,
  purposesOptions = [],
  typesOptions = [],
  districtsOptions = [],
}) => {
  if (!area) {
    return {
      title: "",
      address: "",
      latitude: "",
      longitude: "",
      Types: typesOptions[0]?.value,
      Purposes: purposesOptions[0]?.value,
      size: 0.0,
      coating: "",
      access: OPTIONS.access[0].value,
      open_time: "00:00",
      close_time: "00:00",
      light: OPTIONS.light[0].value,
      additional: "",
      rating: 0.0,
      ownership_form: OPTIONS.ownership_form[0].value,
      inclusiveness: OPTIONS.inclusiveness[0].value,
      district_id: districtsOptions[0]?.value,
    };
  }

  return {
    title: area.title,
    address: area.address,
    latitude: area.latitude,
    longitude: area.longitude,
    Types: area.Types.map((purpose) => ({
      label: purpose.name,
      value: purpose.id,
    })),
    Purposes: area.Purposes.map((purpose) => ({
      label: purpose.title,
      value: purpose.id,
    })),
    size: area.size,
    coating: area.coating,
    access: area.access,
    open_time: area.open_time.substring(0, 5),
    close_time: area.close_time.substring(0, 5),
    light: area.light,
    additional: area.additional,
    rating: area.rating,
    ownership_form: area.ownership_form,
    inclusiveness: area.inclusiveness,
    district_id: area.District.id,
  };
};

export default setInitialValues;
