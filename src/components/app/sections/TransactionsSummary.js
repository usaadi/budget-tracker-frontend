import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import useTransactionsSummary from "../../../api/transactions/useTransactionsSummary";

import {
  getMonthYear,
  shortDateFormatter,
  getRangeFromMonth,
} from "../../../lib/util/formatting/dateFormatting";

import {
  getTransactionTypeName,
  getTransactionTypeNameCapital,
} from "../../../util/getEnumName";

const TransactionsSummary = ({ selectedMonth, transactionType }) => {
  const strDate = getMonthYear(selectedMonth);
  const { fromDate, toDate } = getRangeFromMonth(selectedMonth);

  const transactionTypeName = getTransactionTypeName(transactionType);
  const transactionTypeNameCapital =
    getTransactionTypeNameCapital(transactionType);

  const transactionsSummaryInfo = useTransactionsSummary(
    transactionTypeName,
    fromDate,
    toDate
  );

  const transactionsSummaryItems =
    transactionsSummaryInfo.data?.data?.items ?? [];

  const data = useMemo(
    () => {
      const items = transactionsSummaryItems?.map((item) => ({
        categoryName: item.categoryName,
        description: item.description,
        sum: item.sum,
      }));

      if (items) {
        items.sort((a, b) => b.sum - a.sum);
      }

      return items;
    },
    // {
    //   category: "Food",
    //   sum: 120,
    // },
    // {
    //   category: "Shopping",
    //   sum: 350,
    // },
    [transactionsSummaryItems]
  );

  const sortedData = useMemo(() => data?.sort((a, b) => b.sum > a.sum), [data]);

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
    <div>
      <div className="tw-flex tw-flex-wrap tw-mb-10px">
        Expenses Summary for month: {strDate}
      </div>
      <DataTable columns={columns} data={sortedData} />
    </div>
  );
};

export default TransactionsSummary;
