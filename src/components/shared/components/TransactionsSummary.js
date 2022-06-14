import { useMemo, useState, useCallback } from "react";

import DataTable from "../../../lib/components/DataTable";
import SummaryList from "./SummaryList";

import useTransactionsSummary from "../../../api/transactions/useTransactionsSummary";

import noDataImg from "../../shared/images/no-data.png";

import { getTransactionTypeName } from "../../../util/getEnumName";

const TransactionsSummary = ({ transactionType, className, activeDateRange }) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const transactionTypeName = getTransactionTypeName(transactionType);

  const { startDate: fromDate, endDate: toDate } = activeDateRange;

  const transactionsSummaryInfo = useTransactionsSummary(transactionTypeName, fromDate, toDate, pageSize, pageNumber);
  const transactionsSummaryItems = transactionsSummaryInfo.data?.data?.items ?? [];

  const totalCount = transactionsSummaryInfo.data?.data?.totalCount;
  const pageCount = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0;

  const fetchData = useCallback(({ pageIndex, pageSize }) => {
    setPageNumber(pageIndex + 1);
    setPageSize(pageSize);
  }, []);

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
      },
    ],
    []
  );

  const isEmpty = transactionsSummaryItems.length === 0;
  const extraTableClass = isEmpty ? "" : "lg:tw-block";
  const extraListClass = isEmpty ? "tw-hidden" : "";

  return (
    <div className={className}>
      <div>
        <DataTable
          className={`${extraTableClass} tw-hidden`}
          columns={columns}
          data={transactionsSummaryItems}
          fetchData={fetchData}
          pageCount={pageCount}
          totalCount={totalCount}
        />
        <SummaryList className={`${extraListClass} lg:tw-hidden tw-grow`} data={transactionsSummaryItems} />
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

export default TransactionsSummary;
