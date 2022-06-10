import { transactionTypeEnum } from "../../../constants/enums";
import TransactionsPage from "./TransactionsPage";

const IncomePage = ({ activeDateRange }) => {
  return (
    <TransactionsPage
      transactionType={transactionTypeEnum.income}
      activeDateRange={activeDateRange}
    />
  );
};

export default IncomePage;
