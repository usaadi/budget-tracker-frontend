import { useState } from "react";
import { useMatch } from "react-router-dom";

import MobileHeader from "./MobileHeader";
import IncomeExpensesSwitch from "./IncomeExpensesSwitch";
import FilterSortButton from "./buttons/FilterSortButton";
import CalendarPicker from "./CalendarPicker";
import XButton from "./buttons/XButton";
import AddNewPopup from "./AddNewPopup";
import FilterSortPopup from "./FilterSortPopup";

import whiteCrossIcon from "../../shared/images/white-cross.png";

const Header = ({
  selectedTxType,
  setSelectedTxType,
  onMenuClick,
  setActiveDateRange,
  activeDateRange,
}) => {
  const [showAddNewPopup, setShowAddNewPopup] = useState(false);
  const [showFilterSortPopup, setShowFilterSortPopup] = useState(false);

  const isSummaryPage = useMatch("/app/summary");
  const isCategoriesPage = useMatch("/app/categories");
  const isIncomePage = useMatch("/app/income");
  const isExpensesPage = useMatch("/app/expenses");
  const isProfilePage = useMatch("app/profile");
  const isSettingsPage = useMatch("app/settings");

  const showIncExpSwitch = isSummaryPage || isCategoriesPage;
  const showFilterSortButton = isSummaryPage || isIncomePage || isExpensesPage;

  const hideAddNewButton = isProfilePage || isSettingsPage;

  const showDateRange = showFilterSortButton;

  const toggleFilterSort = () => {
    setShowFilterSortPopup((prev) => !prev);
  };

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
        {showFilterSortButton && (
          <FilterSortButton onClick={toggleFilterSort} className="lg:tw-hidden" />
        )}
        {showDateRange && (
          <CalendarPicker
            activeDateRange={activeDateRange}
            onApply={setActiveDateRange}
            containerClassName="tw-hidden lg:tw-block"
          />
        )}
        {!hideAddNewButton && (
          <>
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
              className="tw-ml-auto lg:tw-hidden tw-rounded-circle tw-fixed tw-bottom-48px tw-right-35px tw-z-10"
            >
              <span className="tw-flex tw-items-center tw-justify-center">
                <img src={whiteCrossIcon} />
              </span>
            </XButton>
          </>
        )}

        {showAddNewPopup && <AddNewPopup onClose={() => setShowAddNewPopup(false)} />}
        {showFilterSortPopup && (
          <FilterSortPopup
            activeDateRange={activeDateRange}
            setActiveDateRange={setActiveDateRange}
            onClose={() => setShowFilterSortPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
