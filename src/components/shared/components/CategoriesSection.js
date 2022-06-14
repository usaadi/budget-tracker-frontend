import { useState, useMemo, useCallback } from "react";

import useCategories from "../../../api/categories/useCategories";

import DataTable from "../../../lib/components/DataTable";

import CategoriesList from "./CategoriesList";

import noDataImg from "../../shared/images/no-data.png";

import { getTransactionTypeName } from "../../../util/getEnumName";

const CategoriesSection = ({ transactionType, className }) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const transactionTypeName = getTransactionTypeName(transactionType);

  const categoriesInfo = useCategories(transactionTypeName, pageSize, pageNumber);
  const categories = categoriesInfo.isSuccess ? categoriesInfo.data?.data?.items : [];

  const totalCount = categoriesInfo.data?.data?.totalCount;
  const pageCount = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0;

  const fetchData = useCallback(({ pageIndex, pageSize }) => {
    setPageNumber(pageIndex + 1);
    setPageSize(pageSize);
  }, []);

  const columns = useMemo(
    () => [
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
            {/* <Button onClick={() => handleEditRow(props.row)}>edit</Button>
            <Button onClick={() => handleDeleteRow(props.row)}>delete</Button> */}
          </div>
        ),
      },
    ],
    [categories]
  );

  const isEmpty = categories.length === 0;

  const extraTableClass = isEmpty ? "" : "lg:tw-block";
  const extraListClass = isEmpty ? "tw-hidden" : "";

  return (
    <div className={className}>
      <div>
        <DataTable
          className={`${extraTableClass} tw-hidden`}
          columns={columns}
          data={categories}
          fetchData={fetchData}
          pageCount={pageCount}
          totalCount={totalCount}
        />
        <CategoriesList className={`${extraListClass} lg:tw-hidden tw-grow`} data={categories} />
      </div>
      {isEmpty && (
        <div className="tw-flex-center tw-flex-col tw-h-full tw-gap-32px">
          <img src={noDataImg} />
          <h1 className="tw-text-34px tw-font-medium">No data to display</h1>
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
