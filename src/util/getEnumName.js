import { categoryTypeEnum } from "../constants/enums";

const getCategoryTypeName = (categoryType) => {
  switch (categoryType) {
    case categoryTypeEnum.expenses:
      return "expenses";
    case categoryTypeEnum.income:
      return "income";
  }
};

export { getCategoryTypeName };
