import { useState, useMemo } from "react";

import DataTable from "../../../lib/components/DataTable";

import useConfirm from "../../../lib/components/confirm/useConfirm";
import useCategories from "../../../api/categories/useCategories";
import useDeleteCategory from "../../../api/categories/useDeleteCategory";

import Button from "../../../lib/components/buttons/Button";
import ModalPopup from "../../../lib/components/ModalPopup";
import AddNewCategoryForm from "../../shared/forms/AddNewCategoryForm";
import EditCategoryForm from "../../shared/forms/EditCategoryForm";

import {
  getTransactionTypeName,
  getTransactionTypeNameCapital,
} from "../../../util/getEnumName";

const Categories = ({ transactionType }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  const transactionTypeName = getTransactionTypeName(transactionType);
  const transactionTypeNameCapital =
    getTransactionTypeNameCapital(transactionType);

  const categoriesInfo = useCategories(transactionTypeName);
  const categories = categoriesInfo.isSuccess
    ? categoriesInfo.data?.data?.items
    : [];

  const deleteCategoryMutation = useDeleteCategory();

  const { isConfirmed } = useConfirm();

  const handleDeleteRow = async (row) => {
    const ok = await isConfirmed(
      "ARE YOU SURE",
      "Are you sure you want to delete this category?",
      "YES DELETE",
      "NO"
    );
    if (ok) {
      deleteCategoryMutation.mutateAsync(
        { uniqueId: row.values.uniqueId },
        {
          onError: async (error) => {
            if (error?.response?.data?.status === 409) {
              handleConfirmDeleteRelatedData(row);
            }
          },
        }
      );
    } else {
      //console.log("Cancel was pressed");
    }
  };

  const handleConfirmDeleteRelatedData = async (row) => {
    const ok = await isConfirmed(
      "ARE YOU SURE",
      "This category contains related transactions and will also be deleted. Are you sure you want to delete this category and all related transactions?",
      "YES DELETE",
      "NO"
    );
    if (ok) {
      deleteCategoryMutation.mutateAsync(
        { uniqueId: row.values.uniqueId, allowDeleteRelatedData: true },
        {
          onError: async (error) => {
            console.log(error);
          },
        }
      );
    } else {
      //console.log("Cancel was pressed");
    }
  };

  const handleAddNew = () => {
    setShowAddNew(true);
  };

  const handleEditRow = (row) => {
    setCurrentCategory(row.values);
    setShowEdit(true);
  };

  const data = useMemo(
    () =>
      categories?.map((cat) => ({
        uniqueId: cat.uniqueId,
        name: cat.name,
        description: cat.description,
      })),
    [categories]
  );

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "uniqueId" },
      {
        Header: "Category",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        Cell: (props) => (
          <div className="tw-flex-center tw-gap-20px">
            <Button onClick={() => handleEditRow(props.row)}>edit</Button>
            <Button onClick={() => handleDeleteRow(props.row)}>delete</Button>
          </div>
        ),
      },
    ],
    [data]
  );

  return (
    <div>
      <div className="tw-flex tw-flex-wrap tw-mb-10px">
        {transactionTypeNameCapital} Categories
        <Button
          onClick={handleAddNew}
          className="tw-min-h-25px tw-px-5px tw-bg-standard-btn-gradient-green-2 tw-rounded-md 
          tw-text-12px tw-text-white tw-font-bold tw-ml-10px"
        >
          Add New
        </Button>
        {showAddNew && (
          <ModalPopup removePopup={() => setShowAddNew(false)}>
            <AddNewCategoryForm
              transactionType={transactionType}
              closeMe={() => setShowAddNew(false)}
            />
          </ModalPopup>
        )}
        {showEdit && (
          <ModalPopup removePopup={() => setShowEdit(false)}>
            <EditCategoryForm
              transactionType={transactionType}
              category={currentCategory}
              closeMe={() => setShowEdit(false)}
            />
          </ModalPopup>
        )}
      </div>
      <DataTable
        columns={columns}
        data={data}
        hiddenColumns={["uniqueId"]}
        noHeader={false}
      />
    </div>
  );
};

export default Categories;
