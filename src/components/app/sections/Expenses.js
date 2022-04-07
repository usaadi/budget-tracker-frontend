import { useState, useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import useTransactions from "../../../api/transactions/useTransactions";

import Button from "../../../lib/components/buttons/Button";
import ModalPopup from "../../../lib/components/ModalPopup";
import AddNewTransactionForm from "../../shared/forms/AddNewTransactionForm";
// import EditTransactionForm from "../../shared/forms/EditTransactionForm";

import { transactionTypeEnum } from "../../../constants/enums";

import { getMonthYear } from "../../../lib/util/formatting/dateFormatting";

const Expenses = ({ selectedMonth }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const transactionsInfo = useTransactions("expenses");
  const transactions = transactionsInfo.isSuccess
    ? transactionsInfo.data.data.items
    : [];

  const strDate = getMonthYear(selectedMonth);
  const data = useMemo(
    () =>
      transactions?.map((item) => ({
        category: item.category.name,
        description: item.description,
        amount: item.amount,
      })),
    [transactions]
  );

  const handleAddNew = () => {
    setShowAddNew(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    ],
    []
  );

  return (
    <div>
      <div className="tw-mb-10px">
        Expenses for month: {strDate}
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
              transactionType={transactionTypeEnum.expenses}
              closeMe={() => setShowAddNew(false)}
            />
          </ModalPopup>
        )}
        {showEdit && (
          <ModalPopup removePopup={() => setShowEdit(false)}>
            {/* <EditTransactionForm
              transactionType={transactionTypeEnum.expenses}
              category={currentCategory}
              closeMe={() => setShowEdit(false)}
            /> */}
          </ModalPopup>
        )}
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Expenses;
