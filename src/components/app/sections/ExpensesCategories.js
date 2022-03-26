import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import useCategories from "../../../api/categories/useCategories";

const ExpensesCategories = () => {
  const categoriesInfo = useCategories("expenses");
  const categories = categoriesInfo.isSuccess ? categoriesInfo.data.data : null;

  const data = useMemo(
    () => categories?.map((cat) => ({ category: cat })),
    [categories]
  );

  // const data = useMemo(
  //   () => [
  //     {
  //       category: "Food",
  //     },
  //     {
  //       category: "Entertainment",
  //     },
  //     {
  //       category: "Education",
  //     },
  //     {
  //       category: "Trasportation",
  //     },
  //     {
  //       category: "Shopping",
  //     },
  //     {
  //       category: "Eating Out",
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
      <div className="tw-mb-10px">Expenses Categories</div>
      <DataTable columns={columns} data={data} noHeader={true} />
    </div>
  );
};

export default ExpensesCategories;
