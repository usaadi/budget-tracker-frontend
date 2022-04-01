import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import { getMonthYear } from "../../../lib/util/formatting/dateFormatting";

const ExpensesSummary = ({ selectedMonth }) => {
  const strDate = getMonthYear(selectedMonth);
  const data = useMemo(
    () => [
      {
        category: "Food",
        sum: 120,
      },
      {
        category: "Entertainment",
        sum: 600,
      },
      {
        category: "Education",
        sum: 65,
      },
      {
        category: "Trasportation",
        sum: 350,
      },
      {
        category: "Shopping",
        sum: 350,
      },
      {
        category: "Eating Out",
        sum: 75,
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
      <div className="tw-mb-10px">Expenses Summary for month: {strDate}</div>
      <DataTable columns={columns} data={sortedData} />
    </div>
  );
};

export default ExpensesSummary;
