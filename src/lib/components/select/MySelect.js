// import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import PropTypes from "prop-types";

import { Controller } from "react-hook-form";

const MySelect = ({
  options,
  className,
  placeholder,
  control,
  name,
  validationRules,
  errorMessage,
  textColor,
  placeholderColor,
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
  return (
    <div className={`form-element form-select ${className ? className : ""}`}>
      <div
        className={`${borderColorClass} form-select-container tw-flex tw-flex-row tw-justify-between tw-items-center
      tw-h-[50px] tw-border tw-border-solid tw-rounded-[25px] tw-bg-white tw-px-18px`}
      >
        <Controller
          control={control}
          name={name}
          rules={validationRules ? validationRules : null}
          render={({ field: { onChange, value, ref } }) => (
            <CreatableSelect
              inputRef={ref}
              options={options}
              styles={customStyles}
              placeholder={placeholder ? placeholder : ""}
              isClearable
              //openMenuOnClick={false}
              allowCreate={allowCreate}
              className="react-select-container"
              classNamePrefix="rs-"
              value={options.find((c) => c.value === value)}
              onChange={(val) => onChange(val?.value)}
            />
          )}
        />
      </div>
      {errorMessage && (
        <div
          className="tw-bg-wf-warning-bg tw-text-wf-warning-text tw-text-[0.938rem] 
          tw-p-[15px] tw-rounded-[2px] tw-font-ar"
        >
          {errorMessage}
        </div>
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
