import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import { getMonthYear } from "../../../lib/util/formatting/dateFormatting";

const IncomeSummary = ({ selectedMonth }) => {
  const strDate = getMonthYear(selectedMonth);
  const data = useMemo(
    () => [
      {
        category: "Salary",
        sum: 600,
      },
      {
        category: "Collected Rent",
        sum: 800,
      },
    ],
    []
  );

  const sortedData = useMemo(() => data?.sort((a, b) => b.sum > a.sum), [data]);

  const columns = useMemo(
    () => [
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Sum",
        accessor: "sum",
      },
    ],
    []
  );

  return (
    <div>
      <div className="tw-flex tw-flex-wrap tw-mb-10px">
        Income Summary for month: {strDate}
      </div>
      <DataTable columns={columns} data={sortedData} />
    </div>
  );
};

export default IncomeSummary;
