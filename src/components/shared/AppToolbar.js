import ToggleGroup from "../../lib/components/ToggleGroup";
import Button from "../../lib/components/buttons/Button";
import DatePicker from "../shared/DatePicker";

import { appSections } from "../shared/defines/consts";

const AppToolbar = ({
  onSectionChanged,
  currentSection,
  onLogout,
  selectedMonth,
  setSelectedMonth,
}) => {
  const monthPickerDisabled =
    currentSection === appSections.expensesCategories ||
    currentSection === appSections.incomeCategories;

  return (
    <div>
      <ToggleGroup
        defaultSelectedIndex={0}
        onSelectedIndexChanged={onSectionChanged}
      >
        {({ setSelectedIndex, isSelected }) => {
          const className =
            "tw-min-h-35px tw-text-14px tw-px-20px tw-rounded-t-11px tw-mr-2px";
          const activeClassName =
            "tw-text-white tw-bg-standard-btn-gradient-green-2";
          const inactiveClassName = "tw-bg-black/20";
          return (
            <>
              <div className="tw-flex tw-flex-wrap tw-gap-y-5px">
                <Button
                  className={className}
                  active={isSelected(0)}
                  activeClassName={activeClassName}
                  inactiveClassName={inactiveClassName}
                  onClick={() => setSelectedIndex(0)}
                >
                  Summary
                </Button>
                <Button
                  className={className}
                  active={isSelected(1)}
                  activeClassName={activeClassName}
                  inactiveClassName={inactiveClassName}
                  onClick={() => setSelectedIndex(1)}
                >
                  Expenses
                </Button>
                <Button
                  className={className}
                  active={isSelected(2)}
                  activeClassName={activeClassName}
                  inactiveClassName={inactiveClassName}
                  onClick={() => setSelectedIndex(2)}
                >
                  Income
                </Button>
                <Button
                  className={className}
                  active={isSelected(3)}
                  activeClassName={activeClassName}
                  inactiveClassName={inactiveClassName}
                  onClick={() => setSelectedIndex(3)}
                >
                  Expenses Summary
                </Button>
                <Button
                  className={className}
                  active={isSelected(4)}
                  activeClassName={activeClassName}
                  inactiveClassName={inactiveClassName}
                  onClick={() => setSelectedIndex(4)}
                >
                  Income Summary
                </Button>
                <Button
                  className="tw-ml-auto tw-text-14px hover:tw-text-black"
                  onClick={onLogout}
                >
                  Log out
                </Button>
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-y-5px tw-mt-5px">
                <Button
                  className={className}
                  active={isSelected(5)}
                  activeClassName={activeClassName}
                  inactiveClassName={inactiveClassName}
                  onClick={() => setSelectedIndex(5)}
                >
                  Expenses Categories
                </Button>
                <Button
                  className={className}
                  active={isSelected(6)}
                  activeClassName={activeClassName}
                  inactiveClassName={inactiveClassName}
                  onClick={() => setSelectedIndex(6)}
                >
                  Income Categories
                </Button>
              </div>
            </>
          );
        }}
      </ToggleGroup>
      <div className="tw-mt-10px">
        <DatePicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          disabled={monthPickerDisabled}
        />
      </div>
    </div>
  );
};

export default AppToolbar;
