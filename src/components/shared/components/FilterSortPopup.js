import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

import ModalOverlay from "./ModalOverlay";
import XModal from "./XModal";

import FilterSortForm from "../forms/FilterSortForm";

import Button from "../../../lib/components/buttons/Button";
import { transactionTypeEnum } from "../../../constants/enums";

const FilterSortPopup = ({ activeDateRange, setActiveDateRange, onClose }) => {
  const isExpenses = useMatch("app/expenses");
  const isCategories = useMatch("app/categories");

  return (
    <ModalOverlay>
      <XModal
        sizeClass="tw-w-full tw-h-full lg:tw-w-464px lg:tw-min-h-200px lg:tw-h-auto"
        onClose={onClose}
      >
        <div className="tw-flex tw-justify-center tw-items-center tw-py-20px">
          <div className="tw-leading-none tw-text-20px tw-font-medium">
            Filter
          </div>
        </div>
        <div className="tw-pt-22px tw-pb-32px tw-px-32px">
          <FilterSortForm
            closeMe={onClose}
            activeDateRange={activeDateRange}
            setActiveDateRange={setActiveDateRange}
          />
        </div>
      </XModal>
    </ModalOverlay>
  );
};

export default FilterSortPopup;
