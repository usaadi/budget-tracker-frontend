const PagingSelect = ({ className, value, onChange, options }) => {
  return (
    <select
      className={`${className} tw-appearance-none tw-inline-block tw-box-border tw-h-40px tw-rounded-5px 
      tw-text-18px tw-bg-bt-blue-100 tw-pl-8px tw-pr-20px tw-bg-no-repeat tw-bg-dropdown-arrow`}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default PagingSelect;
