import { useMemo, useState, useCallback } from "react";

import DataTable from "../../../lib/components/DataTable";
import SummaryList from "./SummaryList";

import useTransactionsSummary from "../../../api/transactions/useTransactionsSummary";

import { getTransactionTypeName } from "../../../util/getEnumName";

const TransactionsSummary = ({
  transactionType,
  className,
  activeDateRange,
}) => {
  const [pageSize, setPageSize] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const transactionTypeName = getTransactionTypeName(transactionType);

  const { startDate: fromDate, endDate: toDate } = activeDateRange;

  const transactionsSummaryInfo = useTransactionsSummary(
    transactionTypeName,
    fromDate,
    toDate,
    pageSize,
    pageNumber
  );
  const transactionsSummaryItems =
    transactionsSummaryInfo.data?.data?.items ?? [];

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

  return (
    <div className={className}>
      <DataTable
        className="tw-hidden lg:tw-block"
        columns={columns}
        data={transactionsSummaryItems}
        fetchData={fetchData}
        pageCount={pageCount}
      />
      <SummaryList
        className="lg:tw-hidden tw-grow"
        data={transactionsSummaryItems}
      />
    </div>
  );
};

export default TransactionsSummary;
