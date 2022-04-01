import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import { getMonthYear } from "../../../lib/util/formatting/dateFormatting";

const Expenses = ({ selectedMonth }) => {
  const strDate = getMonthYear(selectedMonth);
  const data = useMemo(
    () => [
      {
        category: "Food",
        description: "Some food",
        amount: 120,
      },
      {
        category: "Entertainment",
        description: "Movie tickets",
        amount: 600,
      },
      {
        category: "Education",
        description: "some book",
        amount: 65,
      },
      {
        category: "Trasportation",
        description: "Uber",
        amount: 350,
      },
      {
        category: "Shopping",
        description: "Some clothes",
        amount: 350,
      },
      {
        category: "Transportion",
        description: "taxi",
        amount: 50,
      },
      {
        category: "Eating Out",
        description: "McDonalds",
        amount: 75,
      },
      {
        category: "Entertainment",
        description: "Movie tickets",
        amount: 450,
      },
      {
        category: "Education",
        description: "some book",
        amount: 880,
      },
      {
        category: "Trasportation",
        description: "Uber",
        amount: 667,
      },
      {
        category: "Transportion",
        description: "taxi",
        amount: 50,
      },
      {
        category: "Eating Out",
        description: "McDonalds",
        amount: 75,
      },
      {
        category: "Entertainment",
        description: "Movie tickets",
        amount: 450,
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
      <div className="tw-mb-10px">Expenses for month: {strDate}</div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Expenses;
