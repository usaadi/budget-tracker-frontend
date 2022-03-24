import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

const IncomeCategories = () => {
  const data = useMemo(
    () => [
      {
        category: "Salary",
      },
      {
        category: "Collected Rent",
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
      <div className="tw-mb-10px">Income Categories</div>
      <DataTable columns={columns} data={data} noHeader={true} />
    </div>
  );
};

export default IncomeCategories;
