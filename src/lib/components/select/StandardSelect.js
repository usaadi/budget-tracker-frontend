import MySelect from "./MySelect";

const StandardSelect = ({
  options,
  className,
  placeholder,
  control,
  name,
  validationRules,
  errorMessage,
  allowCreate,
  borderColorClass,
  fontFamily = "Roboto",
  fontSize = "1rem",
  placeholderColor = "#7d86a9",
}) => {
  return (
    <MySelect
      options={options}
      className={className}
      placeholder={placeholder}
      control={control}
      name={name}
      errorMessage={errorMessage}
      validationRules={validationRules}
      allowCreate={allowCreate}
      textColor="#000"
      placeholderColor={placeholderColor}
      fontFamily={fontFamily}
      fontSize={fontSize}
      borderColorClass={borderColorClass}
    />
  );
};

export default StandardSelect;
