import { getMonthYear } from "../../../lib/util/formatting/dateFormatting";

const Summary = ({ selectedMonth }) => {
  const strDate = getMonthYear(selectedMonth);

  return (
    <div>
      <div>
        <div className="tw-mb-10px">Summary for month: {strDate}</div>
      </div>
      <div className="tw-grid tw-grid-cols-max-2 tw-border-black-1">
        <div className="tw-pl-10px tw-pr-50px">Expenses</div>
        <div className="">JOD 4000</div>
        <div className="tw-pl-10px tw-pr-50px">Income</div>
        <div className="">JOD 8000</div>
        <div className="tw-pl-10px tw-pr-50px">Balance</div>
        <div className="">JOD 4000</div>
      </div>
    </div>
  );
};

export default Summary;
