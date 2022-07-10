import { useState, useMemo, useCallback } from "react";

import useConfirm from "../../../lib/components/confirm/useConfirm";

import useCategories from "../../../api/categories/useCategories";
import useInfiniteCategories from "../../../api/categories/useInfiniteCategories";
import useDeleteCategory from "../../../api/categories/useDeleteCategory";

import DataTable from "../../../lib/components/DataTable";
import Button from "../../../lib/components/buttons/Button";

import EditCategoryPopup from "./EditCategoryPopup";

import CategoriesList from "./CategoriesList";

import noDataImg from "../../shared/images/no-data.png";
import editIcon from "../../shared/images/edit-icon.png";
import deleteIcon from "../../shared/images/delete-icon.png";

import { getTransactionTypeName, getTransactionTypeSingularName } from "../../../util/getEnumName";

const CategoriesSection = ({ transactionType, className }) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [isDesc, setIsDesc] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  const transactionTypeName = getTransactionTypeName(transactionType);
  const txTypeSingularName = getTransactionTypeSingularName(transactionType);

  const categoriesInfo = useCategories(
    transactionTypeName,
    pageSize,
    pageNumber,
    false,
    sortBy,
    isDesc
  );
  const categories = categoriesInfo.isSuccess ? categoriesInfo.data?.data?.items : [];

  const totalCount = categoriesInfo.data?.data?.totalCount;
  const pageCount = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0;

  const setSorting = (sortBy) => {
    if (sortBy && sortBy.length > 0) {
      const fieldStr = sortBy[0].id;
      setSortBy(fieldStr);
      const isDesc = sortBy[0].desc ? true : false;
      setIsDesc(isDesc);
    }
  };

  const fetchData = useCallback(({ pageIndex, pageSize, sortBy }) => {
    setPageNumber(pageIndex + 1);
    setPageSize(pageSize);
    setSorting(sortBy);
  }, []);

  //// Infinite Query
  const infiniteCategoriesPageSize = 10;
  const infiniteCategoriesInfo = useInfiniteCategories(
    transactionTypeName,
    infiniteCategoriesPageSize
  );
  const infiniteCategoriesPages = infiniteCategoriesInfo.data?.pages;
  const loadMore = () => {
    infiniteCategoriesInfo.fetchNextPage();
  };
  //// End Infinite Query

  const deleteCategoryMutation = useDeleteCategory();

  const { isConfirmed } = useConfirm();

  const handleDeleteRow = (row) => {
    onDeleteItem(row.values);
  };

  const onDeleteItem = async (category) => {
    const ok = await isConfirmed(
      "Delete",
      `Are you sure you want to delete this ${txTypeSingularName} category?`,
      "Delete",
      "Cancel"
    );
    if (ok) {
      deleteCategoryMutation.mutateAsync(
        { uniqueId: category.uniqueId },
        {
          onError: async (error) => {
            if (error?.response?.data?.status === 409) {
              handleConfirmDeleteRelatedData(category);
            } else {
              console.log(error);
            }
          },
        }
      );
    }
  };

  const handleConfirmDeleteRelatedData = async (category) => {
    const ok = await isConfirmed(
      "Delete",
      "This category contains related transactions and will also be deleted. Are you sure you want to delete this category and all related transactions?",
      "Delete",
      "Cancel"
    );
    if (ok) {
      deleteCategoryMutation.mutateAsync(
        { uniqueId: category.uniqueId, allowDeleteRelatedData: true },
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

  const handleEditRow = (row) => {
    setCurrentCategory(row.values);
    setShowEdit(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "uniqueId",
        accessor: "uniqueId",
      },
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
        Cell: ({ cell }) => (
          <>
            <Button onClick={() => handleEditRow(cell.row)}>
              <img src={editIcon} />
            </Button>
            <Button className="tw-ml-21px" onClick={() => handleDeleteRow(cell.row)}>
              <img src={deleteIcon} />
            </Button>
          </>
        ),
      },
    ],
    [categories]
  );

  const isEmpty = categories.length === 0;

  const extraTableClass = isEmpty ? "" : "lg:tw-block";
  const extraListClass = isEmpty ? "tw-hidden" : "";

  return (
    <div
      className={`${className} tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible`}
    >
      <DataTable
        className={`${extraTableClass} tw-hidden`}
        columns={columns}
        data={categories}
        fetchData={fetchData}
        pageCount={pageCount}
        totalCount={totalCount}
        hiddenColumns={["uniqueId"]}
      />
      <CategoriesList
        className={`${extraListClass} lg:tw-hidden tw-grow`}
        pages={infiniteCategoriesPages}
        pageSize={infiniteCategoriesPageSize}
        loadMore={loadMore}
        onDeleteItem={onDeleteItem}
      />
      {isEmpty && (
        <div className="tw-flex-center tw-flex-col tw-h-full tw-gap-32px">
          <img src={noDataImg} />
          <h1 className="tw-text-34px tw-font-medium">No data to display</h1>
        </div>
      )}
      {showEdit && (
        <EditCategoryPopup category={currentCategory} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
};

export default CategoriesSection;
