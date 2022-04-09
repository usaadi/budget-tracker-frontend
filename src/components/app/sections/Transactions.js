import { useState, useMemo, useEffect } from "react";
import DataTable from "../../../lib/components/DataTable";

import useTransactions from "../../../api/transactions/useTransactions";
import useConfirm from "../../../lib/components/confirm/useConfirm";
import useDeleteTransaction from "../../../api/transactions/useDeleteTransaction";

import Button from "../../../lib/components/buttons/Button";
import ModalPopup from "../../../lib/components/ModalPopup";
import AddNewTransactionForm from "../../shared/forms/AddNewTransactionForm";
import EditTransactionForm from "../../shared/forms/EditTransactionForm";

import {
  getTransactionTypeName,
  getTransactionTypeNameCapital,
} from "../../../util/getEnumName";
import {
  getMonthYear,
  shortDateFormatter,
  getRangeFromMonth,
} from "../../../lib/util/formatting/dateFormatting";
import { transactionTypeEnum } from "../../../constants/enums";

const Transactions = ({ selectedMonth, transactionType }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState("");
  const [transactionsCopy, setTransactionsCopy] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const { fromDate, toDate } = getRangeFromMonth(selectedMonth);

  const transactionTypeName = getTransactionTypeName(transactionType);
  const transactionTypeNameCapital =
    getTransactionTypeNameCapital(transactionType);

  const transactionsInfo = useTransactions(
    transactionTypeName,
    fromDate,
    toDate
  );
  const transactions = transactionsInfo.data?.data?.items ?? [];

  const strDate = getMonthYear(selectedMonth);
  const data = useMemo(
    () =>
      transactions?.map((item) => ({
        uniqueId: item.uniqueId,
        transactionDate: shortDateFormatter(item.transactionDate),
        transactionType: item.transactionType,
        categoryName: item.category.name,
        categoryUniqueId: item.category.uniqueId,
        description: item.description,
        amount: item.amount,
      })),
    [transactions]
  );

  if (transactionType == transactionTypeEnum.expenses) {
    console.log("from outside (transactions)");
    console.log(transactions);
    console.log(data);
  }

  useEffect(() => {
    setTransactionsCopy(transactions);
  }, [transactions]);

  const { isConfirmed } = useConfirm();

  const deleteTransactionMutation = useDeleteTransaction(transactionTypeName);

  const handleAddNew = () => {
    setShowAddNew(true);
  };

  const handleEditRow = (row) => {
    //setRefreshTrigger((prev) => !prev);
    const transaction = transactions.find(
      (x) => x.uniqueId === row.values.uniqueId
    );
    if (!transaction) {
      console.log("inside handleEditRow");
      console.log(row.values.uniqueId);
      console.log(transactions);
      console.log(transactionsInfo.data);
      console.log(data);
      console.log("leaving handleEditRow");
      return;
    }

    setCurrentTransaction(transaction);
    setShowEdit(true);
  };

  const handleDeleteRow = async (row) => {
    const ok = await isConfirmed(
      "ARE YOU SURE",
      `Are you sure you want to delete this ${transactionTypeName}?`,
      "YES DELETE",
      "NO"
    );
    if (ok) {
      deleteTransactionMutation.mutate(
        { uniqueId: row.values.uniqueId },
        {
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } else {
      //console.log("Cancel was pressed");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "uniqueId",
        accessor: "uniqueId",
      },
      {
        Header: "Date",
        accessor: "transactionDate",
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
        Cell: (props) => (
          <div className="tw-flex-center tw-gap-20px">
            <Button onClick={() => handleEditRow(props.row)}>edit</Button>
            <Button onClick={() => handleDeleteRow(props.row)}>delete</Button>
          </div>
        ),
      },
    ],
    [data]
  );

  return (
    <div>
      {refreshTrigger && <div>temp</div>}
      <div className="tw-mb-10px">
        {transactionTypeNameCapital} for month: {strDate}
        <Button
          onClick={handleAddNew}
          className="tw-min-h-25px tw-px-5px tw-bg-standard-btn-gradient-green-2 tw-rounded-md 
          tw-text-12px tw-text-white tw-font-bold tw-ml-10px"
        >
          Add New
        </Button>
        {showAddNew && (
          <ModalPopup removePopup={() => setShowAddNew(false)}>
            <AddNewTransactionForm
              openToDate={fromDate}
              transactionType={transactionType}
              closeMe={() => setShowAddNew(false)}
            />
          </ModalPopup>
        )}
        {showEdit && (
          <ModalPopup removePopup={() => setShowEdit(false)}>
            <EditTransactionForm
              transactionType={transactionType}
              transaction={currentTransaction}
              closeMe={() => setShowEdit(false)}
            />
          </ModalPopup>
        )}
      </div>

      <DataTable columns={columns} data={data} hiddenColumns={["uniqueId"]} />
    </div>
  );
};

export default Transactions;
