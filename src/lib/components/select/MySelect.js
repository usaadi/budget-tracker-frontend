// import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import PropTypes from "prop-types";

import { Controller } from "react-hook-form";

const MySelect = ({
  id,
  options,
  className,
  placeholder,
  control,
  name,
  validationRules,
  errorMessage,
  textColor,
  placeholderColor,
  isClearable = true,
  allowCreate,
  fontFamily,
  fontSize,
  borderColorClass = "tw-border-wf-light-slate-grey-2",
}) => {
  const customStyles = {
    input: (provided) => ({
      ...provided,
      color: textColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
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
    }),
    singleValue: (provided) => ({
      ...provided,
      color: textColor,
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

  const extraBorderClass = errorMessage ? "tw-border tw-border-bt-red" : "tw-border-bt-blue-500";

  return (
    <div className={`form-element form-select ${className ? className : ""}`}>
      <div
        className={`${extraBorderClass} tw-h-40px tw-bg-bt-blue-100 tw-w-full tw-rounded-5px tw-px-6px 
    tw-outline-none hover:tw-border focus:tw-border tw-border-solid`}
      >
        <Controller
          control={control}
          name={name}
          rules={validationRules ? validationRules : null}
          render={({ field: { onChange, value, ref } }) => {
            if (allowCreate) {
              return (
                <CreatableSelect
                  inputId={id}
                  inputRef={ref}
                  options={options}
                  styles={customStyles}
                  placeholder={placeholder ? placeholder : ""}
                  isClearable={isClearable}
                  //openMenuOnClick={false}
                  className={`react-select-container`}
                  classNamePrefix="rs-"
                  value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val?.value)}
                />
              );
            } else {
              return (
                <Select
                  inputId={id}
                  inputRef={ref}
                  options={options}
                  styles={customStyles}
                  placeholder={placeholder ? placeholder : ""}
                  isClearable={isClearable}
                  //openMenuOnClick={false}
                  className={`react-select-container`}
                  classNamePrefix="rs-"
                  value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val?.value)}
                />
              );
            }
          }}
        />
      </div>
      {errorMessage && (
        <div className="tw-absolute tw-text-bt-red tw-text-12px">{errorMessage}</div>
      )}
    </div>
  );
};

MySelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default MySelect;
