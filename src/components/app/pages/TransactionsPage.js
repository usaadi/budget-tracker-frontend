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
import { act } from "react-dom/test-utils";

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

const TransactionsPage = ({ transactionType, activeDateRange = {} }) => {
  const [pageSize, setPageSize] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const { startDate: fromDate, endDate: toDate } = activeDateRange;

  console.log(activeDateRange);

  const transactionTypeName = getTransactionTypeName(transactionType);

  const transactionsInfo = useTransactions(
    transactionTypeName,
    fromDate,
    toDate,
    pageSize,
    pageNumber
  );
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
  return (
    <>
      {data ? (
        <div className="tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible">
          <DataTable
            className="tw-hidden lg:tw-block"
            columns={columns}
            data={data}
            fetchData={fetchData}
            pageCount={pageCount}
          />
          <TransactionList className="lg:tw-hidden tw-grow" data={data} />
        </div>
      ) : (
        <div className="tw-flex-center tw-flex-col tw-h-full tw-gap-32px">
          <img src={noDataImg} />
          <h1 className="tw-text-34px tw-font-medium">No data to display</h1>
        </div>
      )}
    </>
  );
};

export default TransactionsPage;