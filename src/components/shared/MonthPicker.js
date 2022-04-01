import { useState } from "react";

import Picker from "react-month-picker";
import Button from "../../lib/components/buttons/Button";
import "react-month-picker/css/month-picker.css";

const pickerLangDefault = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  from: "From",
  to: "To",
};

const MonthPicker = ({
  currentDateRange,
  years = 100,
  pickerLang = pickerLangDefault,
}) => {
  const [showPicker, setShowPicker] = useState(true);
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  return (
    <div className="tw-relative">
      <Button onClick={togglePicker}>Month Picker</Button>
      <Picker
        show={showPicker}
        years={years}
        value={currentDateRange}
        lang={pickerLang}
      />
    </div>
  );
};

export default MonthPicker;
