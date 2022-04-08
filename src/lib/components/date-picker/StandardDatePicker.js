import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StandardDatePicker = ({
  control,
  className,
  name,
  validationRules = null,
  errorMessage,
}) => {
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        rules={validationRules}
        render={({ field }) => (
          <DatePicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
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