import { useMemo } from "react";

import DataTable from "../../../lib/components/DataTable";
import List from "../../../lib/components/List";
import AmountDisplay from "../../shared/components/AmountDisplay";

import noDataImg from "../../../components/shared/images/no-data.png";
import incomeIcon from "../../../components/shared/images/summary/income.png";
import expensesIcon from "../../../components/shared/images/summary/expenses.png";
import balanceIcon from "../../../components/shared/images/summary/balance.png";
import incomeSmIcon from "../../../components/shared/images/summary/income-sm.png";
import expensesSmIcon from "../../../components/shared/images/summary/expenses-sm.png";
import balanceSmIcon from "../../../components/shared/images/summary/balance-sm.png";

const summarySampleData = {
  incomeSum: 3000,
  expensesSum: 2445,
  balance: 555,
  incomeSummary: [
    {
      salary: 1600,
    },
  ],
  expensesSummary: [
    {
      categoryId: 1,
      categoryName: "Food",
      description: "Everything that I eat",
      amount: 53,
    },
    {
      categoryId: 2,
      categoryName: "Travel",
      description: "",
      amount: 15,
    },
    {
      categoryId: 3,
      categoryName: "Entertainment",
      description: "Movies, parties, etc.",
      amount: 100,
    },
    {
      categoryId: 4,
      categoryName: "Games",
      description: "Games for PC or PS",
      amount: 45,
    },
    {
      categoryId: 5,
      categoryName: "Taxes",
      description: "",
      amount: 1250,
    },
    {
      categoryId: 6,
      categoryName: "Transportation",
      description: "Taxi, Uber, or bus",
      amount: 100,
    },
    {
      categoryId: 7,
      categoryName: "Books",
      description: "",
      amount: 35,
    },
    {
      categoryId: 8,
      categoryName: "Spontaneous expenses",
      description: "Expenses that aren't necessary",
      amount: 65,
    },
    {
      categoryId: 9,
      categoryName: "Clothes",
      description: "",
      amount: 150,
    },
    {
      categoryId: 10,
      categoryName: "Groceries",
      description: "",
      amount: 350,
    },
    {
      categoryId: 11,
      categoryName: "Travel",
      description: "",
      amount: 750,
    },
  ],
};

const SummaryPage = () => {
  const data = summarySampleData;
  const expensesData = useMemo(() => {
    return data.expensesSummary;
  }, [data]);
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
        Header: "Amount",
        accessor: "amount",
      },
    ],
    []
  );
  return (
    <>
      {data ? (
        <div className="tw-flex tw-flex-col tw-items-stretch">
          <div className="tw-flex tw-gap-8px lg:tw-gap-20px tw-mb-42px">
            <AmountDisplay
              title="Income"
              amount={data.incomeSum}
              icon={incomeIcon}
              iconSm={incomeSmIcon}
              className="tw-grow"
            />
            <AmountDisplay
              title="Expenses"
              amount={data.expensesSum}
              icon={expensesIcon}
              iconSm={expensesSmIcon}
              className="tw-grow"
            />
            <AmountDisplay
              title="Balance"
              amount={data.balance}
              icon={balanceIcon}
              iconSm={balanceSmIcon}
              className="tw-grow"
            />
          </div>
          <DataTable
            className="tw-hidden lg:tw-block"
            columns={columns}
            data={expensesData}
          />
          <List className="lg:tw-hidden" data={expensesData} />
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

export default SummaryPage;
