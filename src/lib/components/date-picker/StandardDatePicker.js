import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StandardDatePicker = ({
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
      <Controller
        control={control}
        name={name}
        rules={validationRules}
        render={({ field }) => (
          <DatePicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(convertLocalToUTCDate(date))}
            selected={convertUTCToLocalDate(field.value)}
            openToDate={openToDate}
          />
        )}
      />
      {errorMessage && (
        <div
          className="tw-bg-wf-warning-bg tw-text-wf-warning-text tw-text-[0.938rem] 
          tw-p-[15px] tw-rounded-[2px] tw-font-ar"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default StandardDatePicker;
