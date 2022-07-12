import List from "../../../lib/components/List";

import { kFormatter } from "../../../lib/util/formatting/numberFormatting";
import { shortDateFormatter } from "../../../lib/util/formatting/dateFormatting";

import Button from "../../../lib/components/buttons/Button";

import deleteIcon from "../../shared/images/delete-icon.svg";
import editIcon from "../../shared/images/edit-icon.svg";

const TransactionList = ({ pages, pageSize, className, loadMore, onDeleteItem, onEditItem }) => {
  const itemsCount = pages
    ? pages.reduce((prev, current) => {
        return prev + current.data.items.length;
      }, 0)
    : 0;
  const transformFn = (index) => {
    const pageIndex = Math.floor(index / pageSize);
    const itemIndex = index % pageSize;
    const item = pages[pageIndex].data.items[itemIndex];
    return (
      <div
        className="tw-bg-bt-blue-100 tw-mb-8px tw-rounded-5px
          tw-flex tw-flex-col"
      >
        <div className="tw-px-12px tw-py-5px tw-flex tw-text-12px tw-text-bt-gray-700 tw-border-b tw-border-solid tw-border-bt-blue-200">
          <span>{shortDateFormatter(item.transactionDate)}</span>
          <Button onClick={() => onEditItem(item)} className="tw-ml-auto tw-mr-5px">
            <img src={editIcon} className="tw-w-15px tw-opacity-50 hover:tw-opacity-100" />
          </Button>
          <Button onClick={() => onDeleteItem(item)}>
            <img src={deleteIcon} className="tw-w-15px tw-opacity-50 hover:tw-opacity-100" />
          </Button>
        </div>
        <div className="tw-px-12px tw-pt-18px tw-pb-14px tw-flex">
          <div className="tw-flex tw-flex-col tw-items-start tw-gap-8px">
            <span className="tw-text-18px tw-font-medium tw-leading-none">
              {item.category.name}
            </span>
            <span className="tw-text-14px tw-leading-none">{item.description}</span>
          </div>
          <div className="tw-ml-auto tw-text-24px tw-font-medium tw-leading-none">{`$${kFormatter(
            item.amount
          )}`}</div>
        </div>
      </div>
    );
  };
  return (
    <List
      transformFn={transformFn}
      className={className}
      loadMore={loadMore}
      itemsCount={itemsCount}
    />
  );
};

export default TransactionList;
