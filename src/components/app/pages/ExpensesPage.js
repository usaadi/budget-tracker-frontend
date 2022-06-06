import { transactionTypeEnum } from "../../../constants/enums";
import TransactionsPage from "./TransactionsPage";

const ExpensesPage = () => {
  return <TransactionsPage transactionType={transactionTypeEnum.expenses} />;
};

export default ExpensesPage;
