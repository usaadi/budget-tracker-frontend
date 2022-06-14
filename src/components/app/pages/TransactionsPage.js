import { useCallback, useMemo, useState } from "react";

import DataTable from "../../../lib/components/DataTable";
import TransactionList from "../../shared/components/TransactionList";
import Button from "../../../lib/components/buttons/Button";

import noDataImg from "../../shared/images/no-data.png";
import editIcon from "../../shared/images/edit-icon.png";
import deleteIcon from "../../shared/images/delete-icon.png";

import { transactionTypeEnum } from "../../../constants/enums";
import { shortDateFormatter } from "../../../lib/util/formatting/dateFormatting";
import { getTransactionTypeName } from "../../../util/getEnumName";
import useTransactions from "../../../api/transactions/useTransactions";

const sampleIncome = [
  {
    transactionDate: "2022-01-02T00:00:00+00:00",
    amount: 1000,
    categoryId: 1,
    categoryName: "Salary",
    description: "description",
  },
];

const sampleExpenses = [
  {
    transactionDate: "2022-01-02T00:00:00+00:00",
    amount: 50,
    categoryId: 1,
    categoryName: "Food",
    description: "description",
  },
];

const TransactionsPage = ({ transactionType, activeDateRange }) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  if (!activeDateRange) {
    activeDateRange = {};
  }

  const { startDate: fromDate, endDate: toDate } = activeDateRange;

  const transactionTypeName = getTransactionTypeName(transactionType);

  const transactionsInfo = useTransactions(transactionTypeName, fromDate, toDate, pageSize, pageNumber);
  const transactions = transactionsInfo.data?.data?.items ?? [];

  const totalCount = transactionsInfo.data?.data?.totalCount;
  const pageCount = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0;

  const fetchData = useCallback(({ pageIndex, pageSize }) => {
    setPageNumber(pageIndex + 1);
    setPageSize(pageSize);
    //transactionsInfo.refetch();
  }, []);

  const data = useMemo(() => {
    return transactions.map((x) => ({
      transactionDateStr: shortDateFormatter(x.transactionDate),
      categoryName: x.category.name,
      ...x,
    }));
  }, [transactions]);
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "transactionDateStr",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Category",
        accessor: "categoryName",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        Cell: ({ cell }) => (
          <>
            <Button>
              <img src={editIcon} />
            </Button>
            <Button className="tw-ml-21px">
              <img src={deleteIcon} />
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const isEmpty = data.length === 0;
  const extraTableClass = isEmpty ? "" : "lg:tw-block";
  const extraListClass = isEmpty ? "tw-hidden" : "";

  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible">
        <DataTable
          className={`${extraTableClass} tw-hidden`}
          columns={columns}
          data={data}
          fetchData={fetchData}
          pageCount={pageCount}
          totalCount={totalCount}
        />
        <TransactionList className={`${extraListClass} lg:tw-hidden tw-grow`} data={data} />
      </div>
      {isEmpty && (
        <div className="tw-flex-center tw-flex-col tw-h-full tw-gap-32px">
          <img src={noDataImg} />
          <h1 className="tw-text-34px tw-font-medium">No data to display</h1>
        </div>
      )}
    </>
  );
};

export default TransactionsPage;
