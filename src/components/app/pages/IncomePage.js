import { transactionTypeEnum } from "../../../constants/enums";
import TransactionsPage from "./TransactionsPage";

const IncomePage = () => {
  return <TransactionsPage transactionType={transactionTypeEnum.income} />;
};

export default IncomePage;
