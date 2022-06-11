import List from "../../../lib/components/List";
import { kFormatter } from "../../../lib/util/formatting/numberFormatting";

const SummaryList = ({ data, className }) => {
  const transformFn = (index, key) => {
    const item = data[index];
    return (
      <div
        key={key}
        className={`tw-bg-bt-blue-100 tw-pt-18px tw-pb-14px tw-px-12px tw-mb-8px tw-rounded-5px
          tw-flex`}
      >
        <div className="tw-flex tw-flex-col tw-items-start tw-gap-8px">
          <span className="tw-text-18px tw-font-medium tw-leading-none">
            {item.categoryName}
          </span>
          <span className="tw-text-14px tw-leading-none">
            {item.description}
          </span>
        </div>
        <div className="tw-ml-auto tw-text-24px tw-font-medium tw-leading-none">{`$${kFormatter(
          item.sum
        )}`}</div>
      </div>
    );
  };
  return <List data={data} transformFn={transformFn} className={className} />;
};

export default SummaryList;
