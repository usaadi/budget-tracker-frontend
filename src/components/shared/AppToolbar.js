import ToggleGroup from "../../lib/components/ToggleGroup";
import Button from "../../lib/components/buttons/Button";
import DatePicker from "../shared/DatePicker";

const AppToolbar = ({
  onSectionChanged,
  onLogout,
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <div>
      <div>
        <ToggleGroup
          defaultSelectedIndex={0}
          onSelectedIndexChanged={onSectionChanged}
        >
          {({ setSelectedIndex, isSelected }) => {
            const className =
              "tw-h-35px tw-text-14px tw-px-20px tw-rounded-t-11px tw-mr-2px";
            const activeClassName =
              "tw-text-white tw-bg-standard-btn-gradient-green-2";
            const inactiveClassName = "tw-bg-black/20";
            return (
              <>
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
              </>
            );
          }}
        </ToggleGroup>
        <Button
          className="tw-ml-10px tw-text-14px hover:tw-text-black"
          onClick={onLogout}
        >
          Log out
        </Button>
      </div>
      <div className="tw-mt-10px">
        <DatePicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>
    </div>
  );
};

export default AppToolbar;
