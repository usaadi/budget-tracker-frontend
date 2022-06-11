import { useMemo, useState } from "react";

import DataTable from "../../../lib/components/DataTable";
import CategoriesList from "../../shared/components/CategoriesList";
import Button from "../../../lib/components/buttons/Button";

import noDataImg from "../../shared/images/no-data.png";
import editIcon from "../../shared/images/edit-icon.png";
import deleteIcon from "../../shared/images/delete-icon.png";
import CategoriesSection from "../../shared/components/CategoriesSection";

import { transactionTypeEnum } from "../../../constants/enums";

const sampleCategories = [
  { categoryId: 1, categoryName: "Food", description: "description" },
  { categoryId: 2, categoryName: "Travel", description: "description" },
];

const CategoriesPage = ({ transactionType }) => {
  return (
    <div className="tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible">
      <CategoriesSection
        className={transactionType !== transactionTypeEnum.income ? "tw-hidden" : ""}
        transactionType={transactionTypeEnum.income}
      />
      <CategoriesSection
        className={transactionType !== transactionTypeEnum.expenses ? "tw-hidden" : ""}
        transactionType={transactionTypeEnum.expenses}
      />
    </div>
  );
};

export default CategoriesPage;
