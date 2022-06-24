import { useState, useMemo, useCallback } from "react";

import useCategories from "../../../api/categories/useCategories";
import useInfiniteCategories from "../../../api/categories/useInfiniteCategories";

import DataTable from "../../../lib/components/DataTable";

import CategoriesList from "./CategoriesList";

import noDataImg from "../../shared/images/no-data.png";

import { getTransactionTypeName } from "../../../util/getEnumName";

const CategoriesSection = ({ transactionType, className }) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [isDesc, setIsDesc] = useState(false);

  const transactionTypeName = getTransactionTypeName(transactionType);

  const categoriesInfo = useCategories(transactionTypeName, pageSize, pageNumber, false, sortBy, isDesc);
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
  const infiniteCategoriesInfo = useInfiniteCategories(transactionTypeName, infiniteCategoriesPageSize);
  const infiniteCategoriesPages = infiniteCategoriesInfo.data?.pages;
  const loadMore = () => {
    infiniteCategoriesInfo.fetchNextPage();
  };
  //// End Infinite Query

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
    <div className={`${className} tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible`}>
      <DataTable
        className={`${extraTableClass} tw-hidden`}
        columns={columns}
        data={categories}
        fetchData={fetchData}
        pageCount={pageCount}
        totalCount={totalCount}
      />
      <CategoriesList
        className={`${extraListClass} lg:tw-hidden tw-grow`}
        pages={infiniteCategoriesPages}
        pageSize={infiniteCategoriesPageSize}
        loadMore={loadMore}
      />
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
