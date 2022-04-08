import Picker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ selectedMonth, setSelectedMonth, disabled }) => {
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
    <Picker
      selected={convertUTCToLocalDate(selectedMonth)}
      onChange={(date) => setSelectedMonth(convertLocalToUTCDate(date))}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      showFourColumnMonthYearPicker
      disabled={disabled}
    />
  );
};

export default DatePicker;
