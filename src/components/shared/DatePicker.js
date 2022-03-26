import Picker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ selectedMonth, setSelectedMonth, disabled }) => {
  return (
    <Picker
      selected={selectedMonth}
      onChange={(date) => setSelectedMonth(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      showFourColumnMonthYearPicker
      disabled={disabled}
    />
  );
};

export default DatePicker;
