import { transactionTypeEnum } from "../constants/enums";

const getTransactionTypeName = (transactionType) => {
  switch (transactionType) {
    case transactionTypeEnum.expenses:
      return "expenses";
    case transactionTypeEnum.income:
      return "income";
  }
};

const getTransactionTypeSingularName = (transactionType) => {
  switch (transactionType) {
    case transactionTypeEnum.expenses:
      return "expense";
    case transactionTypeEnum.income:
      return "income";
  }
};

const getTransactionTypeNameCapital = (transactionType) => {
  switch (transactionType) {
    case transactionTypeEnum.expenses:
      return "Expenses";
    case transactionTypeEnum.income:
      return "Income";
  }
};

export { getTransactionTypeName, getTransactionTypeNameCapital, getTransactionTypeSingularName };
