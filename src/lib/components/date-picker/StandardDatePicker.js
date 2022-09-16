import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StandardDatePicker = ({
  id,
  control,
  openToDate,
  className,
  name,
  validationRules = null,
  errorMessage,
}) => {
  const convertUTCToLocalDate = (date) => {
    if (!date) {
      return date;
    }
    date = new Date(date);
    date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return date;
  };

  const convertLocalToUTCDate = (date) => {
    if (!date) {
      return date;
    }
    date = new Date(date);
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return date;
  };

  const extraBorderClass = errorMessage ? "tw-border tw-border-bt-red" : "tw-border-bt-blue-500";

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        rules={validationRules}
        render={({ field }) => (
          <DatePicker
            id={id}
            className={`${extraBorderClass} tw-h-40px tw-bg-bt-blue-100 tw-w-full tw-rounded-5px tw-px-16px tw-text-18px tw-text-bt-black
            tw-outline-none hover:tw-border focus:tw-border tw-border-solid`}
            wrapperClassName="bt-date-picker"
            placeholderText="Select date"
            onChange={(date) => field.onChange(convertLocalToUTCDate(date))}
            selected={convertUTCToLocalDate(field.value)}
            openToDate={openToDate}
          />
        )}
      />
      {errorMessage && (
        <div className="tw-absolute tw-text-bt-red tw-text-12px">{errorMessage}</div>
      )}
    </div>
  );
};

export default StandardDatePicker;
