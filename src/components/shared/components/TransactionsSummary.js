import { useMemo, useState, useCallback } from "react";

import DataTable from "../../../lib/components/DataTable";
import SummaryList from "./SummaryList";

import useTransactionsSummary from "../../../api/transactions/useTransactionsSummary";
import useInfiniteTransactionsSummary from "../../../api/transactions/useInfiniteTransactionsSummary";
import useUserSettings from "../../../api/userSettings/useUserSettings";

import noDataImg from "../../shared/images/no-data.png";

import { getTransactionTypeName } from "../../../util/getEnumName";

const TransactionsSummary = ({ transactionType, className, activeDateRange }) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [isDesc, setIsDesc] = useState(false);

  const transactionTypeName = getTransactionTypeName(transactionType);

  const { startDate: fromDate, endDate: toDate } = activeDateRange;

  const transactionsSummaryInfo = useTransactionsSummary(
    transactionTypeName,
    fromDate,
    toDate,
    pageSize,
    pageNumber,
    sortBy,
    isDesc
  );
  const transactionsSummaryItems = transactionsSummaryInfo.data?.data?.items ?? [];

  const totalCount = transactionsSummaryInfo.data?.data?.totalCount;
  const pageCount = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0;

  const setSorting = (sortBy) => {
    if (sortBy && sortBy.length > 0) {
      const fieldStr = sortBy[0].id;
      let field;
      switch (fieldStr) {
        case "categoryName":
          field = "category";
          break;
        default:
          field = fieldStr;
          break;
      }
      setSortBy(field);
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
  const infiniteTxSummaryPageSize = 10;
  const infiniteTxSummaryInfo = useInfiniteTransactionsSummary(
    transactionTypeName,
    fromDate,
    toDate,
    infiniteTxSummaryPageSize
  );
  const infiniteTxSummaryPages = infiniteTxSummaryInfo.data?.pages;
  const loadMore = () => {
    infiniteTxSummaryInfo.fetchNextPage();
  };
  //// End Infinite Query

  const userSettingsInfo = useUserSettings();
  const userSettings = userSettingsInfo.data?.data;
  const currencySymbol = userSettings?.currencySymbol;

  const columns = useMemo(
    () => [
      {
        Header: "Category",
        accessor: "categoryName",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Sum",
        accessor: "sum",
        Cell: ({ cell }) => (
          <>
            {currencySymbol}
            {cell.value}
          </>
        ),
      },
    ],
    [currencySymbol]
  );

  const isEmpty = transactionsSummaryItems.length === 0;
  const extraTableClass = isEmpty ? "" : "lg:tw-block";
  const extraListClass = isEmpty ? "tw-hidden" : "";

  return (
    <div
      className={`${className} tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible`}
    >
      <DataTable
        className={`${extraTableClass} tw-hidden`}
        columns={columns}
        data={transactionsSummaryItems}
        fetchData={fetchData}
        pageCount={pageCount}
        totalCount={totalCount}
      />
      <SummaryList
        className={`${extraListClass} lg:tw-hidden tw-grow`}
        pages={infiniteTxSummaryPages}
        pageSize={infiniteTxSummaryPageSize}
        loadMore={loadMore}
      />
      {isEmpty && (
        <div className="tw-flex tw-justify-start tw-items-center tw-flex-col tw-h-full tw-gap-32px">
          <img src={noDataImg} />
          <h1 className="tw-text-34px tw-font-medium">No data to display</h1>
        </div>
      )}
    </div>
  );
};

export default TransactionsSummary;
