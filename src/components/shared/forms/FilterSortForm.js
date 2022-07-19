import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";

import { validate as isValidUUID } from "uuid";

import useCreateTransaction from "../../../api/transactions/useCreateTransaction";
import useCategories from "../../../api/categories/useCategories";

import StandardInput from "../../../lib/components/input/StandardInput";
import StandardSelect from "../../../lib/components/select/StandardSelect";
import DatePicker from "../../../lib/components/date-picker/DatePicker";

import CalendarPicker from "../components/CalendarPicker";

import buildErrorMessage from "../../../util/buildErrorMessage";

import XButton from "../../shared/components/buttons/XButton";
import Spinner from "../../../lib/components/Spinner";
import whiteCrossIcon from "../../shared/images/white-cross.png";

import { getTransactionTypeName } from "../../../util/getEnumName";
import patterns from "../../../constants/patterns";

const FilterSortForm = ({ closeMe, setActiveDateRange, activeDateRange }) => {
  // const transactionTypeName = getTransactionTypeName(transactionType);

  const [startDate, setStartDate] = useState(activeDateRange?.startDate);
  const [endDate, setEndDate] = useState(activeDateRange?.endDate);

  // const startDate = activeDateRange?.startDate;
  // const endDate = activeDateRange?.endDate;

  const onApply = () => {
    setActiveDateRange({ startDate, endDate });
    closeMe();
  };

  return (
    <div className={`tw-flex tw-flex-col tw-items-stretch`}>
      <label
        htmlFor="from-date"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        From Date
      </label>
      <DatePicker
        id="from-date"
        //openToDate={openToDate}
        name="fromDate"
        value={startDate}
        onChange={(value) => setStartDate(value)}
        className="tw-mb-20px"
      />
      <label
        htmlFor="end-date"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        To Date
      </label>
      <DatePicker
        id="to-date"
        //openToDate={openToDate}
        name="toDate"
        value={endDate}
        onChange={(value) => setEndDate(value)}
        className="tw-mb-20px"
      />

      <XButton onClick={onApply} className="tw-text-18px tw-font-bold">
        <span className="tw-flex tw-justify-center tw-items-center tw-gap-10px">
          <span>Apply</span>
        </span>
      </XButton>
    </div>
  );
};

export default FilterSortForm;
