import { transactionTypeEnum } from "../../../constants/enums";
import TransactionsPage from "./TransactionsPage";

const ExpensesPage = ({ activeDateRange }) => {
  return (
    <TransactionsPage
      transactionType={transactionTypeEnum.expenses}
      activeDateRange={activeDateRange}
    />
  );
};

export default ExpensesPage;
