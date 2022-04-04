import { useState, useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import useCategories from "../../../api/categories/useCategories";

import Button from "../../../lib/components/buttons/Button";
import ModalPopup from "../../../lib/components/ModalPopup";
import AddNewCategoryForm from "../../shared/forms/AddNewCategoryForm";

import { categoryTypeEnum } from "../../../constants/enums";

const ExpensesCategories = () => {
  const [showAddNew, setShowAddNew] = useState(false);

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };

  const categoriesInfo = useCategories("expenses");
  const categories = categoriesInfo.isSuccess
    ? categoriesInfo.data?.data?.items
    : null;

  const data = useMemo(
    () =>
      categories?.map((cat) => ({
        category: cat.name,
        description: cat.description,
      })),
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
      {
        Header: "Description",
        accessor: "description",
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
            <AddNewCategoryForm
              categoryType={categoryTypeEnum.expenses}
              closeMe={() => setShowAddNew(false)}
            />
          </ModalPopup>
        )}
      </div>
      <DataTable columns={columns} data={data} noHeader={false} />
    </div>
  );
};

export default ExpensesCategories;
