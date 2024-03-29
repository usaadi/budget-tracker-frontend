import { useCallback, useMemo, useState } from "react";

import useConfirm from "../../../lib/components/confirm/useConfirm";

import DataTable from "../../../lib/components/DataTable";
import TransactionList from "../../shared/components/TransactionList";
import Button from "../../../lib/components/buttons/Button";
import EditTransactionPopup from "../../shared/components/EditTransactionPopup";

import useTransactions from "../../../api/transactions/useTransactions";
import useInfiniteTransactions from "../../../api/transactions/useInfiniteTransactions";
import useDeleteTransaction from "../../../api/transactions/useDeleteTransaction";
import useUserSettings from "../../../api/userSettings/useUserSettings";

import noDataImg from "../../shared/images/no-data.png";
import editIcon from "../../shared/images/edit-icon.png";
import deleteIcon from "../../shared/images/delete-icon.png";

import { transactionTypeEnum } from "../../../constants/enums";
import { shortDateFormatter } from "../../../lib/util/formatting/dateFormatting";
import { getTransactionTypeName, getTransactionTypeSingularName } from "../../../util/getEnumName";

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
  const [sortBy, setSortBy] = useState(null);
  const [isDesc, setIsDesc] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState("");

  if (!activeDateRange) {
    activeDateRange = {};
  }

  const { startDate: fromDate, endDate: toDate } = activeDateRange;

  const transactionTypeName = getTransactionTypeName(transactionType);
  const txTypeSingularName = getTransactionTypeSingularName(transactionType);

  const transactionsInfo = useTransactions(
    transactionTypeName,
    fromDate,
    toDate,
    pageSize,
    pageNumber,
    sortBy,
    isDesc
  );
  const transactions = transactionsInfo.data?.data?.items ?? [];

  const totalCount = transactionsInfo.data?.data?.totalCount;
  const pageCount = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0;

  const setSorting = (sortBy) => {
    if (sortBy && sortBy.length > 0) {
      const fieldStr = sortBy[0].id;
      let field;
      switch (fieldStr) {
        case "transactionDateStr":
          field = "transactionDate";
          break;
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
    console.log(sortBy);
    setSorting(sortBy);
    //transactionsInfo.refetch();
  }, []);

  const infiniteTxPageSize = 10;
  const infiniteTransactionsInfo = useInfiniteTransactions(
    transactionTypeName,
    fromDate,
    toDate,
    infiniteTxPageSize
  );
  const infiniteTxPages = infiniteTransactionsInfo.data?.pages;
  const loadMore = () => {
    infiniteTransactionsInfo.fetchNextPage();
  };

  const { isConfirmed } = useConfirm();

  const deleteTransactionMutation = useDeleteTransaction(transactionTypeName);

  const handleDeleteRow = (row) => {
    onDeleteItem(row.values);
    // const ok = await isConfirmed(
    //   "Delete",
    //   `Are you sure you want to delete this ${transactionTypeName}?`,
    //   "Delete",
    //   "Cancel"
    // );
    // if (ok) {
    //   deleteTransactionMutation.mutateAsync(
    //     { uniqueId: row.values.uniqueId },
    //     {
    //       onError: async (error) => {
    //         console.log(error);
    //       },
    //     }
    //   );
    // }
  };

  const onDeleteItem = async (transaction) => {
    const ok = await isConfirmed(
      "Delete",
      `Are you sure you want to delete this ${txTypeSingularName}?`,
      "Delete",
      "Cancel"
    );
    if (ok) {
      deleteTransactionMutation.mutateAsync(
        { uniqueId: transaction.uniqueId },
        {
          onError: async (error) => {
            console.log(error);
          },
        }
      );
    }
  };

  const handleEditRow = (row) => {
    const transaction = transactions.find((x) => x.uniqueId === row.values.uniqueId);
    if (!transaction) {
      return;
    }
    onEditItem(transaction);
  };

  const onEditItem = (transaction) => {
    setCurrentTransaction(transaction);
    setShowEdit(true);
  };

  const userSettingsInfo = useUserSettings();
  const userSettings = userSettingsInfo.data?.data;
  const currencySymbol = userSettings?.currencySymbol;

  const data = useMemo(() => {
    return transactions.map((x) => ({
      transactionDateStr: shortDateFormatter(x.transactionDate),
      categoryName: x.category.name,
      ...x,
    }));
  }, [transactions, currencySymbol]);

  const columns = useMemo(
    () => [
      {
        Header: "uniqueId",
        accessor: "uniqueId",
      },
      {
        Header: "Date",
        accessor: "transactionDateStr",
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ cell }) => (
          <>
            {currencySymbol}
            {cell.value}
          </>
        ),
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
              <img src={editIcon} onClick={() => handleEditRow(cell.row)} />
            </Button>
            <Button className="tw-ml-21px" onClick={() => handleDeleteRow(cell.row)}>
              <img src={deleteIcon} />
            </Button>
          </>
        ),
      },
    ],
    [data, currencySymbol]
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
          hiddenColumns={["uniqueId"]}
        />
        <TransactionList
          className={`${extraListClass} lg:tw-hidden tw-grow`}
          pages={infiniteTxPages}
          pageSize={infiniteTxPageSize}
          loadMore={loadMore}
          onDeleteItem={onDeleteItem}
          onEditItem={onEditItem}
        />
      </div>
      {isEmpty && (
        <div className="tw-flex-center tw-flex-col tw-h-full tw-gap-32px">
          <img src={noDataImg} />
          <h1 className="tw-text-34px tw-font-medium">No data to display</h1>
        </div>
      )}
      {showEdit && (
        <EditTransactionPopup transaction={currentTransaction} onClose={() => setShowEdit(false)} />
      )}
    </>
  );
};

export default TransactionsPage;
