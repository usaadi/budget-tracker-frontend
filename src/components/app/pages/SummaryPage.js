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
