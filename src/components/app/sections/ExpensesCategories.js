import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

const ExpensesCategories = () => {
  const data = useMemo(
    () => [
      {
        category: "Food",
      },
      {
        category: "Entertainment",
      },
      {
        category: "Education",
      },
      {
        category: "Trasportation",
      },
      {
        category: "Shopping",
      },
      {
        category: "Eating Out",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Category",
        accessor: "category",
      },
    ],
    []
  );

  return (
    <div>
      <div className="tw-mb-10px">Expenses Categories</div>
      <DataTable columns={columns} data={data} noHeader={true} />
    </div>
  );
};

export default ExpensesCategories;
