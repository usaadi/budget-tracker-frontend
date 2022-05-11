import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import useSummary from "../../../api/summary/useSummary";

import {
  getMonthYear,
  getRangeFromMonth,
} from "../../../lib/util/formatting/dateFormatting";

const Summary = ({ selectedMonth }) => {
  const strDate = getMonthYear(selectedMonth);
  const { fromDate, toDate } = getRangeFromMonth(selectedMonth);
  const summaryInfo = useSummary(fromDate, toDate);
  const summary = summaryInfo.data?.data ?? {};

  const data = useMemo(
    () => [
      {
        item: "Expenses",
        description: summary?.expensesSum,
      },
      {
        item: "Income",
        description: summary?.incomeSum,
      },
      {
        item: "Balance",
        description: summary?.balance,
      },
    ],
    [summary]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Item",
        accessor: "item",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <div className="tw-flex tw-flex-wrap tw-mb-10px">
          Summary for month: {strDate}
        </div>
        <DataTable
          columns={columns}
          data={data}
          noHeader={true}
          noPagination={true}
        />
      </div>
    </div>
  );
};

export default Summary;
