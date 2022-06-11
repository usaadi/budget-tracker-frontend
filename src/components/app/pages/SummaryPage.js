import { useMemo, useState, useCallback } from "react";

import useSummary from "../../../api/summary/useSummary";

import AmountDisplay from "../../shared/components/AmountDisplay";
import TransactionSummary from "../../shared/components/TransactionsSummary";

import incomeIcon from "../../../components/shared/images/summary/income.png";
import expensesIcon from "../../../components/shared/images/summary/expenses.png";
import balanceIcon from "../../../components/shared/images/summary/balance.png";
import incomeSmIcon from "../../../components/shared/images/summary/income-sm.png";
import expensesSmIcon from "../../../components/shared/images/summary/expenses-sm.png";
import balanceSmIcon from "../../../components/shared/images/summary/balance-sm.png";
import noDataImg from "../../shared/images/no-data.png";

import { transactionTypeEnum } from "../../../constants/enums";

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
      categoryName: "Food",
      description: "Everything that I eat",
      amount: 53,
    },
    {
      categoryId: 12,
      categoryName: "Travel",
      description: "",
      amount: 15,
    },
    {
      categoryId: 13,
      categoryName: "Entertainment",
      description: "Movies, parties, etc.",
      amount: 100,
    },
    {
      categoryId: 14,
      categoryName: "Games",
      description: "Games for PC or PS",
      amount: 45,
    },
    {
      categoryId: 15,
      categoryName: "Taxes",
      description: "",
      amount: 1250,
    },
    {
      categoryId: 16,
      categoryName: "Transportation",
      description: "Taxi, Uber, or bus",
      amount: 100,
    },
    {
      categoryId: 17,
      categoryName: "Books",
      description: "",
      amount: 35,
    },
    {
      categoryId: 18,
      categoryName: "Spontaneous expenses",
      description: "Expenses that aren't necessary",
      amount: 65,
    },
    {
      categoryId: 19,
      categoryName: "Clothes",
      description: "",
      amount: 150,
    },
    {
      categoryId: 20,
      categoryName: "Groceries",
      description: "",
      amount: 350,
    },
    {
      categoryId: 21,
      categoryName: "Food",
      description: "Everything that I eat",
      amount: 53,
    },
    {
      categoryId: 22,
      categoryName: "Travel",
      description: "",
      amount: 15,
    },
    {
      categoryId: 23,
      categoryName: "Entertainment",
      description: "Movies, parties, etc.",
      amount: 100,
    },
    {
      categoryId: 24,
      categoryName: "Games",
      description: "Games for PC or PS",
      amount: 45,
    },
    {
      categoryId: 25,
      categoryName: "Taxes",
      description: "",
      amount: 1250,
    },
    {
      categoryId: 26,
      categoryName: "Transportation",
      description: "Taxi, Uber, or bus",
      amount: 100,
    },
    {
      categoryId: 27,
      categoryName: "Books",
      description: "",
      amount: 35,
    },
    {
      categoryId: 28,
      categoryName: "Spontaneous expenses",
      description: "Expenses that aren't necessary",
      amount: 65,
    },
    {
      categoryId: 29,
      categoryName: "Clothes",
      description: "",
      amount: 150,
    },
    {
      categoryId: 30,
      categoryName: "Groceries",
      description: "",
      amount: 350,
    },
    {
      categoryId: 31,
      categoryName: "Food",
      description: "Everything that I eat",
      amount: 53,
    },
    {
      categoryId: 32,
      categoryName: "Travel",
      description: "",
      amount: 15,
    },
    {
      categoryId: 33,
      categoryName: "Entertainment",
      description: "Movies, parties, etc.",
      amount: 100,
    },
    {
      categoryId: 34,
      categoryName: "Games",
      description: "Games for PC or PS",
      amount: 45,
    },
    {
      categoryId: 35,
      categoryName: "Taxes",
      description: "",
      amount: 1250,
    },
    {
      categoryId: 36,
      categoryName: "Transportation",
      description: "Taxi, Uber, or bus",
      amount: 100,
    },
    {
      categoryId: 37,
      categoryName: "Books",
      description: "",
      amount: 35,
    },
    {
      categoryId: 38,
      categoryName: "Spontaneous expenses",
      description: "Expenses that aren't necessary",
      amount: 65,
    },
    {
      categoryId: 39,
      categoryName: "Clothes",
      description: "",
      amount: 150,
    },
    {
      categoryId: 40,
      categoryName: "Groceries",
      description: "",
      amount: 350,
    },
    {
      categoryId: 41,
      categoryName: "Food",
      description: "Everything that I eat",
      amount: 53,
    },
    {
      categoryId: 42,
      categoryName: "Travel",
      description: "",
      amount: 15,
    },
    {
      categoryId: 43,
      categoryName: "Entertainment",
      description: "Movies, parties, etc.",
      amount: 100,
    },
    {
      categoryId: 44,
      categoryName: "Games",
      description: "Games for PC or PS",
      amount: 45,
    },
    {
      categoryId: 45,
      categoryName: "Taxes",
      description: "",
      amount: 1250,
    },
    {
      categoryId: 46,
      categoryName: "Transportation",
      description: "Taxi, Uber, or bus",
      amount: 100,
    },
    {
      categoryId: 47,
      categoryName: "Books",
      description: "",
      amount: 35,
    },
  ],
};

const SummaryPage = ({ activeDateRange, transactionType }) => {
  if (!activeDateRange) {
    activeDateRange = {};
  }

  const { startDate: fromDate, endDate: toDate } = activeDateRange;

  const summaryInfo = useSummary(fromDate, toDate);
  const summary = summaryInfo.data?.data ?? {};

  return (
    <div className="tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible">
      <div className="tw-flex tw-gap-8px lg:tw-gap-20px tw-mb-42px">
        <AmountDisplay
          title="Income"
          amount={summary.incomeSum}
          icon={incomeIcon}
          iconSm={incomeSmIcon}
          className="tw-grow"
        />
        <AmountDisplay
          title="Expenses"
          amount={summary.expensesSum}
          icon={expensesIcon}
          iconSm={expensesSmIcon}
          className="tw-grow"
        />
        <AmountDisplay
          title="Balance"
          amount={summary.balance}
          icon={balanceIcon}
          iconSm={balanceSmIcon}
          className="tw-grow"
        />
      </div>
      <TransactionSummary
        className={transactionType !== transactionTypeEnum.income ? "tw-hidden" : ""}
        transactionType={transactionTypeEnum.income}
        activeDateRange={activeDateRange}
      />
      <TransactionSummary
        className={transactionType !== transactionTypeEnum.expenses ? "tw-hidden" : ""}
        transactionType={transactionTypeEnum.expenses}
        activeDateRange={activeDateRange}
      />
    </div>
  );
};

export default SummaryPage;
