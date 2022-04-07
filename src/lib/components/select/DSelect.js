import Select from "react-select";

const DSelect = ({
  className = "",
  textColor = "",
  fontFamily = "",
  fontSize = "",
  placeholderColor = "",
  placeholder = "",
  height,
  borderRadius,
  multiValueBackground,
  multiValueBorderRadius,
  multiValueLabelColor,
  multiValuePadding = "0 5px",
  isMulti = false,
  components = {},
  options = [],
  defaultValue,
  onChange,
}) => {
  const customStyles = {
    input: (provided) => ({
      ...provided,
      color: textColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      margin: "0px",
    }),
    option: (provided) => ({
      ...provided,
      color: textColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
    }),
    control: (provided) => ({
      ...provided,
      color: textColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      //height: height,
      minHeight: height,
      borderRadius: borderRadius,
    }),
    valueContainer: (provided) => ({
      ...provided,
      gap: "2px",
      //height: height,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: height,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: textColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
    }),
    multiValue: (provided) => ({
      ...provided,
      color: multiValueLabelColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      margin: "0px",
      borderRadius: multiValueBorderRadius,
      background: multiValueBackground,
      padding: multiValuePadding,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: multiValueLabelColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: placeholderColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
    }),
    indicatorSeparator: (provided) => ({ display: "none" }),
  };
  return (
    <div className={`${className} form-select`}>
      <Select
        components={components}
        options={options}
        defaultValue={defaultValue}
        styles={customStyles}
        placeholder={placeholder}
        className="react-select-container"
        classNamePrefix="rs-"
        isClearable
        isMulti={isMulti}
        onChange={onChange}
      />
    </div>
  );
};

export default DSelect;
