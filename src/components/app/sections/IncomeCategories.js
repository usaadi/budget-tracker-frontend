import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import useCategories from "../../../api/categories/useCategories";

const IncomeCategories = () => {
  const categoriesInfo = useCategories("income");
  const categories = categoriesInfo.isSuccess ? categoriesInfo.data.data : null;

  const data = useMemo(
    () => categories?.map((cat) => ({ category: cat })),
    [categories]
  );

  // const data = useMemo(
  //   () => [
  //     {
  //       category: "Salary",
  //     },
  //     {
  //       category: "Collected Rent",
  //     },
  //   ],
  //   []
  // );

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
