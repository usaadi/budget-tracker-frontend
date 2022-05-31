import { transactionTypeEnum } from "../../../constants/enums";

const IncomeExpensesSwitch = ({
  className,
  selectedTxType = transactionTypeEnum.income,
  setSelectedTxType,
}) => {
  const commonClass = "tw-w-1/2 lg:tw-w-auto lg:tw-px-16px tw-text-18px";
  const activeClass = "tw-bg-bt-orange tw-text-white";
  const inactiveClass = "tw-bg-white tw-text-bt-orange";
  const incomeClass =
    selectedTxType === transactionTypeEnum.income ? activeClass : inactiveClass;
  const expensesClass =
    selectedTxType === transactionTypeEnum.expenses
      ? activeClass
      : inactiveClass;

  return (
    <div
      className={`${className} tw-flex tw-border tw-border-solid tw-border-bt-orange 
        tw-h-40px tw-rounded-5px tw-overflow-hidden`}
    >
      <button
        className={`${commonClass} ${incomeClass}`}
        onClick={() => setSelectedTxType(transactionTypeEnum.income)}
      >
        Income
      </button>
      <button
        className={`${commonClass} ${expensesClass}`}
        onClick={() => setSelectedTxType(transactionTypeEnum.expenses)}
      >
        Expenses
      </button>
    </div>
  );
};

export default IncomeExpensesSwitch;
