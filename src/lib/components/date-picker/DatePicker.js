import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({
  id,
  onChange,
  value,
  openToDate,
  className,
  name,
  isClearable = false,
}) => {
  const convertUTCToLocalDate = (date) => {
    if (!date) {
      return date;
    }
    date = new Date(date);
    date = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
    return date;
  };

  const convertLocalToUTCDate = (date) => {
    if (!date) {
      return date;
    }
    date = new Date(date);
    date = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return date;
  };

  return (
    <div className={className}>
      <ReactDatePicker
        id={id}
        name={name}
        className={`tw-h-40px tw-bg-bt-blue-100 tw-w-full tw-rounded-5px tw-px-16px tw-text-18px tw-text-bt-black
            tw-outline-none hover:tw-border focus:tw-border tw-border-solid`}
        wrapperClassName="bt-date-picker"
        onChange={(date) => onChange(convertLocalToUTCDate(date))}
        selected={convertUTCToLocalDate(value)}
        openToDate={openToDate}
        isClearable={isClearable}
      />
    </div>
  );
};

export default DatePicker;
