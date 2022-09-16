import { useState, useEffect, useRef, useMemo } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import _ from "lodash";

import Button from "../../../lib/components/buttons/Button";
import calendarIcon from "../../shared/images/calendar-icon.png";
import closeIcon from "../../shared/images/gray-close-icon.png";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { shortDateFormatter } from "../../../lib/util/formatting/dateFormatting";

const CalendarPicker = ({
  containerClassName,
  onApply,
  activeDateRange,
  locale = "en-us",
}) => {
  const [datePickerState, setDatePickerState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDropDown, setShowDropDown] = useState(false);
  const refDropdown = useRef();
  const toggleShowDropDown = () => {
    setShowDropDown((prevShowDropDown) => !prevShowDropDown);
  };
  useEffect(() => {
    if (showDropDown) {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [showDropDown]);
  const handleClick = (e) => {
    if (
      refDropdown &&
      refDropdown.current &&
      refDropdown.current.contains(e.target)
    ) {
      return;
    }
    setShowDropDown(false);
  };

  const pickerStateItem =
    datePickerState?.length > 0 ? datePickerState[0] : null;

  const selectedRange = pickerStateItem
    ? {
        startDate: pickerStateItem.startDate,
        endDate: pickerStateItem.endDate,
      }
    : null;

  const isDirty = !_.isEqual(activeDateRange, selectedRange);

  const applyDateRange = () => {
    onApply(selectedRange);
  };

  const clearDates = (e) => {
    e.stopPropagation();
    onApply(null);
  };

  const dateRangeText = useMemo(() => {
    if (!activeDateRange) {
      return "(All time)";
    }
    const startDateText = activeDateRange.startDate
      ? shortDateFormatter(activeDateRange.startDate, locale)
      : "___";
    const endDateText = activeDateRange.endDate
      ? shortDateFormatter(activeDateRange.endDate, locale)
      : "___";
    return `${startDateText} - ${endDateText}`;
  }, [activeDateRange, locale]);

  const dropdownTransitionClass = "tw-transition-dropdown tw-duration-300";
  const showDropDownClass = showDropDown
    ? "tw-pt-2px tw-pb-14px tw-px-2px tw-max-h-600px tw-shadow-1"
    : "tw-max-h-0 tw-p-0";

  return (
    <div className={containerClassName}>
      <Button
        onClick={() => toggleShowDropDown()}
        className="tw-h-40px tw-bg-bt-gray-1 tw-rounded-5px tw-text-18px tw-w-320px"
      >
        <span className="tw-px-16px tw-flex tw-items-center">
          <span>{dateRangeText}</span>
          <div className="tw-ml-auto tw-flex tw-items-center">
            {activeDateRange && (
              <img
                onClick={clearDates}
                src={closeIcon}
                className="tw-mr-10px"
              />
            )}
            <img src={calendarIcon} />
          </div>
        </span>
      </Button>
      {
        <div
          ref={refDropdown}
          className={`${dropdownTransitionClass} ${showDropDownClass} tw-bg-white tw-rounded-9px 
            tw-overflow-hidden tw-z-100 tw-min-w-30px tw-absolute tw-top-[75px] tw-right-22px 
            tw-select-text`}
        >
          <DateRangePicker
            ranges={datePickerState}
            onChange={(item) => setDatePickerState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
          />
          <div className="tw-flex tw-items-center tw-justify-center tw-mt-20px">
            <Button
              onClick={applyDateRange}
              className="tw-px-20px tw-py-4px tw-rounded-15px"
              enabledClassName="tw-bg-standard-btn-gradient-blue tw-text-white"
              disabledClassName="tw-bg-db-gray-6 tw-text-gray-600 tw-cursor-default"
              disabled={!isDirty}
            >
              Apply
            </Button>
          </div>
        </div>
      }
    </div>
  );
};

export default CalendarPicker;
