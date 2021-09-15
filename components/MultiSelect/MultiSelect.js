import PropTypes from "prop-types";
import Select, { components } from "react-select";
import styles from "./MultiSelect.module.scss";
import Checkbox from "../checkbox/Checkbox";

const Option = (props) => (
  <div className={styles.optionVar}>
    <components.Option {...props}>
      <Checkbox
        state={props.isSelected}
        text={props.label}
        changeState={() => null}
      />
    </components.Option>
  </div>
);

export default function MultiSelect({
  data,
  value,
  handleChange,
  type = "район",
}) {
  const customStyle = {
    container: (base) => ({
      ...base,
      width: "100%",
    }),
    control: (base) => ({
      ...base,
      paddingRight: "2px",
      minHeight: "42px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#737B7D",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "15px",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 6px 8px 6px",
    }),
    multiValue: (base) => ({
      ...base,
      margin: "6px 6px 0 6px",
      borderRadius: "3px",
      padding: "3px 3px 3px 0",
      fontWeight: "400",
      fontSize: "10px",
      lineHeight: "11px",
    }),
    menu: (base) => ({
      ...base,
      minWidth: "150px",
      maxWidth: "337px",

      zIndex: 4,
    }),
    option: (base) => ({
      ...base,
      padding: "0",
      display: "flex",
      alignItems: "center",

      backgroundColor: "#ffffff",
    }),
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.filterType}>{type}</p>
      <Select
        options={data}
        theme={(theme) => ({
          ...theme,
          controlHeight: "42px",
          borderRadius: "3px",
          colors: {
            ...theme.colors,
            primary50: "#ffffff",
            primary75: "#ffffff",
            primary25: "#ffffff",
            primary: "#7BB9FA",
            neutral10: "#D0D0D0",
            dangerLight: "#D0D0D0",
          },
        })}
        styles={customStyle}
        isMulti
        isSearchable={false}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ Option }}
        onChange={handleChange}
        value={value}
        placeholder={"Не вибрано"}
      />
    </div>
  );
}

MultiSelect.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
