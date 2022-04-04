import { useState, useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import useCategories from "../../../api/categories/useCategories";

import Button from "../../../lib/components/buttons/Button";
import ModalPopup from "../../../lib/components/ModalPopup";
import AddNewCategoryForm from "../../shared/forms/AddNewCategoryForm";

const ExpensesCategories = () => {
  const [showAddNew, setShowAddNew] = useState(false);

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };

  const categoriesInfo = useCategories("expenses");
  const categories = categoriesInfo.isSuccess ? categoriesInfo.data : null;

  const data = useMemo(
    () => categories?.items?.map((cat) => ({ category: cat })),
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
      <div className="tw-mb-10px">
        Expenses Categories
        <Button
          onClick={toggleAddNew}
          className="tw-min-h-25px tw-px-5px tw-bg-standard-btn-gradient-green-2 tw-rounded-md 
          tw-text-12px tw-text-white tw-font-bold tw-ml-10px"
        >
          Add New
        </Button>
        {showAddNew && (
          <ModalPopup removePopup={() => setShowAddNew(false)}>
            <AddNewCategoryForm />
          </ModalPopup>
        )}
      </div>
      <DataTable columns={columns} data={data} noHeader={true} />
    </div>
  );
};

export default ExpensesCategories;
