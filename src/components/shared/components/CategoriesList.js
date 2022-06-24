import List from "../../../lib/components/List";
import { kFormatter } from "../../../lib/util/formatting/numberFormatting";
import { shortDateFormatter } from "../../../lib/util/formatting/dateFormatting";

const CategoriesList = ({ pages, pageSize, className, loadMore }) => {
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
        className={`tw-bg-bt-blue-100 tw-pt-18px tw-pb-14px tw-px-12px tw-mb-8px tw-rounded-5px
          tw-flex`}
      >
        <div className="tw-flex tw-flex-col tw-items-start tw-gap-8px">
          <span className="tw-text-18px tw-font-medium tw-leading-none">{item.name}</span>
          <span className="tw-text-14px tw-leading-none">{item.description}</span>
        </div>
      </div>
    );
  };
  return <List transformFn={transformFn} className={className} loadMore={loadMore} itemsCount={itemsCount} />;
};

export default CategoriesList;
