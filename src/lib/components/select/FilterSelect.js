import DSelect from "./DSelect";

const FilterSelect = ({ className, options, defaultValue, onChange }) => {
  return (
    <DSelect
      className={`${className} tw-min-h-[28px] tw-rounded-25px
              tw-border tw-border-solid tw-border-db-blue-gray-1/50
              tw-flex tw-justify-center tw-items-center`}
      options={options}
      defaultValue={defaultValue}
      fontFamily="helvetica"
      fontSize={12}
      textColor="black"
      height="26px"
      borderRadius="25px"
      multiValueBackground="linear-gradient(to bottom, #0087f8, #0062f2)"
      multiValueLabelColor="white"
      multiValueBorderRadius="10px"
      isMulti={true}
      onChange={onChange}
    />
  );
};

export default FilterSelect;
