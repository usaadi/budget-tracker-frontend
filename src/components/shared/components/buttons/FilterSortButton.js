import Button from "../../../../lib/components/buttons/Button";

import filterIcon from "../../images/filter-icon.png";

const FilterSortButton = ({ className }) => {
  const text = "Filter and sort";
  return (
    <Button
      className={`${className} tw-border tw-border-solid tw-border-bt-gray-100
        tw-rounded-5px tw-h-32px`}
    >
      <span className="tw-flex tw-items-center tw-justify-center tw-gap-[10px]">
        <img src={filterIcon} className=""></img>
        <span className="tw-text-14px">{text}</span>
      </span>
    </Button>
  );
};

export default FilterSortButton;
