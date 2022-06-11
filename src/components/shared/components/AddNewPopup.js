import { useState } from "react";

import ModalOverlay from "./ModalOverlay";
import XModal from "./XModal";

import AddTransactionForm from "../forms/AddTransactionForm";
import AddCategoryForm from "../forms/AddCategoryForm";

import Button from "../../../lib/components/buttons/Button";
import { transactionTypeEnum } from "../../../constants/enums";

const AddNewPopup = ({ onClose }) => {
  const [selectedTabNumber, setSelectedTabNumber] = useState(1);

  const isTab = (num) => selectedTabNumber === num;

  const commonTabButtonClass = "tw-border-b tw-border-solid tw-h-40px tw-text-18px tw-font-medium";
  const activeTabButtonClass = "tw-border-bt-orange tw-text-bt-orange";
  const inactiveTabButtonClass = "tw-border-bt-blue-200 tw-text-bt-gray-600";

  const tab1ButtonClass = isTab(1) ? activeTabButtonClass : inactiveTabButtonClass;
  const tab2ButtonClass = isTab(2) ? activeTabButtonClass : inactiveTabButtonClass;
  const tab3ButtonClass = isTab(3) ? activeTabButtonClass : inactiveTabButtonClass;

  return (
    <ModalOverlay>
      <XModal sizeClass="tw-w-full tw-h-full lg:tw-w-464px lg:tw-min-h-200px lg:tw-h-auto" onClose={onClose}>
        <div className="tw-flex tw-justify-center tw-items-center tw-py-20px">
          <div className="tw-leading-none tw-text-20px tw-font-medium">Add new</div>
        </div>
        <div className="tw-grid tw-grid-cols-3">
          <Button onClick={() => setSelectedTabNumber(1)} className={`${commonTabButtonClass} ${tab1ButtonClass}`}>
            Income
          </Button>
          <Button onClick={() => setSelectedTabNumber(2)} className={`${commonTabButtonClass} ${tab2ButtonClass}`}>
            Expenses
          </Button>
          <Button onClick={() => setSelectedTabNumber(3)} className={`${commonTabButtonClass} ${tab3ButtonClass}`}>
            Categories
          </Button>
        </div>
        <div className="tw-pt-22px tw-pb-32px tw-px-32px">
          <AddTransactionForm transactionType={transactionTypeEnum.income} isHidden={!isTab(1)} closeMe={onClose} />
          <AddTransactionForm transactionType={transactionTypeEnum.expenses} isHidden={!isTab(2)} closeMe={onClose} />
          <AddCategoryForm isHidden={!isTab(3)} closeMe={onClose} />
        </div>
      </XModal>
    </ModalOverlay>
  );
};

export default AddNewPopup;
