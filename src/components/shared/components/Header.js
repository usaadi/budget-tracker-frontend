import { useState } from "react";
import { useLocation } from "react-router-dom";

import MobileHeader from "./MobileHeader";
import IncomeExpensesSwitch from "./IncomeExpensesSwitch";
import FilterSortButton from "./buttons/FilterSortButton";
import CalendarPicker from "./CalendarPicker";
import XButton from "./buttons/XButton";
import AddNewPopup from "./AddNewPopup";

import whiteCrossIcon from "../../shared/images/white-cross.png";

const Header = ({
  selectedTxType,
  setSelectedTxType,
  onMenuClick,
  setActiveDateRange,
  activeDateRange,
}) => {
  const [showAddNewPopup, setShowAddNewPopup] = useState(false);
  const { pathname } = useLocation();

  const showIncExpSwitch = ["/app/summary", "/app/categories"].find((x) =>
    pathname.toLowerCase().match(x)
  );

  const showFilterSortButton = [
    "/app/summary",
    "/app/income",
    "/app/expenses",
  ].find((x) => pathname.toLowerCase().match(x));

  const showDateRange = showFilterSortButton;

  return (
    <div className="tw-flex tw-flex-col tw-items-stretch tw-mb-16px lg:tw-mb-32px">
      <MobileHeader onMenuClick={onMenuClick} className="tw-mb-18px" />
      <div className="tw-flex tw-flex-col lg:tw-flex-row">
        {showIncExpSwitch && (
          <IncomeExpensesSwitch
            className="tw-mb-16px lg:tw-mb-0 lg:tw-mr-20px"
            selectedTxType={selectedTxType}
            setSelectedTxType={setSelectedTxType}
          />
        )}
        {showFilterSortButton && <FilterSortButton className="lg:tw-hidden" />}
        {showDateRange && (
          <CalendarPicker
            activeDateRange={activeDateRange}
            onApply={setActiveDateRange}
            containerClassName="tw-hidden lg:tw-block"
          />
        )}
        <XButton
          onClick={() => setShowAddNewPopup(true)}
          className="tw-ml-auto tw-hidden lg:tw-block"
        >
          <span className="tw-flex tw-items-center tw-gap-10px">
            <img src={whiteCrossIcon} />
            <span>Add new</span>
          </span>
        </XButton>
        <XButton
          onClick={() => setShowAddNewPopup(true)}
          className="tw-ml-auto lg:tw-hidden tw-rounded-circle tw-fixed tw-bottom-16px tw-right-16px"
        >
          <span className="tw-flex tw-items-center tw-justify-center">
            <img src={whiteCrossIcon} />
          </span>
        </XButton>
        {showAddNewPopup && (
          <AddNewPopup onClose={() => setShowAddNewPopup(false)} />
        )}
      </div>
    </div>
  );
};

export default Header;
