import List from "../../../lib/components/List";
import { kFormatter } from "../../../lib/util/formatting/numberFormatting";
import { shortDateFormatter } from "../../../lib/util/formatting/dateFormatting";

const TransactionList = ({ data, className }) => {
  const transformFn = (index, key) => {
    const item = data[index];
    return (
      <div
        key={key}
        className="tw-bg-bt-blue-100 tw-mb-8px tw-rounded-5px
          tw-flex tw-flex-col"
      >
        <div className="tw-px-12px tw-py-5px tw-flex tw-text-12px tw-text-bt-gray-700 tw-border-b tw-border-solid tw-border-bt-blue-200">
          {item.transactionDateStr}
        </div>
        <div className="tw-px-12px tw-pt-18px tw-pb-14px tw-flex">
          <div className="tw-flex tw-flex-col tw-items-start tw-gap-8px">
            <span className="tw-text-18px tw-font-medium tw-leading-none">
              {item.categoryName}
            </span>
            <span className="tw-text-14px tw-leading-none">
              {item.description}
            </span>
          </div>
          <div className="tw-ml-auto tw-text-24px tw-font-medium tw-leading-none">{`$${kFormatter(
            item.amount
          )}`}</div>
        </div>
      </div>
    );
  };
  return <List data={data} transformFn={transformFn} className={className} />;
};

export default TransactionList;
