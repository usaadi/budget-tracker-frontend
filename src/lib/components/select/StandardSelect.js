import MySelect from "./MySelect";

const StandardSelect = ({
  id,
  options,
  className,
  placeholder,
  control,
  name,
  validationRules,
  errorMessage,
  borderColorClass,
  fontFamily = "Roboto",
  fontSize = "1rem",
  placeholderColor = "#7d86a9",
  menuPosition = "fixed",
  menuPlacement = "auto",
  textColor = "#000",
  allowCreate = false,
  isClearable,
}) => {
  return (
    <MySelect
      id={id}
      isClearable={isClearable}
      options={options}
      menuPosition={menuPosition}
      menuPlacement={menuPlacement}
      className={className}
      placeholder={placeholder}
      control={control}
      name={name}
      errorMessage={errorMessage}
      validationRules={validationRules}
      allowCreate={allowCreate}
      textColor={textColor}
      placeholderColor={placeholderColor}
      fontFamily={fontFamily}
      fontSize={fontSize}
      borderColorClass={borderColorClass}
    />
  );
};

export default StandardSelect;
