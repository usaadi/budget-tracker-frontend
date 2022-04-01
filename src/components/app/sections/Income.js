import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import { getMonthYear } from "../../../lib/util/formatting/dateFormatting";

const Income = ({ selectedMonth }) => {
  const strDate = getMonthYear(selectedMonth);
  const data = useMemo(
    () => [
      {
        category: "Salary",
        description: "-",
        amount: 2500,
      },
      {
        category: "Collected Rent",
        description: "Rent for Apartment",
        amount: 1500,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Category",
        accessor: "category", // accessor is the "key" in the data
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    ],
    []
  );

  return (
    <div>
      <div className="tw-mb-10px">Income for month: {strDate}</div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Income;
