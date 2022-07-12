import { useMatch } from "react-router-dom";

import Button from "../../../lib/components/buttons/Button";

import logo from "../images/logo.svg";
import menuIcon from "../images/ham-menu.png";

import { appTitle } from "../defines/consts";

const MobileHeader = ({ className, onMenuClick }) => {
  const isSummary = useMatch("app/summary");
  const isIncome = useMatch("app/income");
  const isExpenses = useMatch("app/expenses");
  const isCategories = useMatch("app/categories");

  const pageTitle = isSummary
    ? "Summary"
    : isIncome
    ? "Income"
    : isExpenses
    ? "Expenses"
    : isCategories
    ? "Categories"
    : "";

  return (
    <div className={`${className} tw-flex tw-items-center lg:tw-hidden`}>
      <img src={logo} className="tw-w-31px tw-mr-9px" />
      <div>
        <span className={`tw-inline tw-text-16px tw-font-semibold tw-select-none`}>{appTitle}</span>
        <span
          className={`tw-inline tw-text-14px tw-font-semibold tw-text-slate-500 tw-select-none tw-ml-10px`}
        >
          {pageTitle}
        </span>
      </div>
      <Button onClick={onMenuClick} className="tw-ml-auto tw-mr-5px">
        <img src={menuIcon} />
      </Button>
    </div>
  );
};

export default MobileHeader;
