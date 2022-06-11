import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../lib/components/buttons/Button";

import summaryIcon from "./images/app-nav/summary.png";
import summaryIconActive from "./images/app-nav/summary-active.png";
import expensesIcon from "./images/app-nav/expenses.png";
import expensesIconActive from "./images/app-nav/expenses-active.png";
import incomeIcon from "./images/app-nav/income.png";
import incomeIconActive from "./images/app-nav/income-active.png";
import categoriesIcon from "./images/app-nav/categories.png";
import categoriesIconActive from "./images/app-nav/categories-active.png";

const menuItems = [
  {
    title: "Summary",
    url: "/app/summary",
    icon: summaryIcon,
    activeIcon: summaryIconActive,
  },
  {
    title: "Income",
    url: "/app/income",
    icon: incomeIcon,
    activeIcon: incomeIconActive,
  },
  {
    title: "Expenses",
    url: "/app/expenses",
    icon: expensesIcon,
    activeIcon: expensesIconActive,
  },
  {
    title: "Categories",
    url: "/app/categories",
    icon: categoriesIcon,
    activeIcon: categoriesIconActive,
  },
];

const AppNavbar = ({ className, closeMenu }) => {
  const location = useLocation();
  const currentPage = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const navigate = useNavigate();

  const onItemClick = (url) => {
    closeMenu();
    navigate(url);
  };

  return (
    <nav className={`${className}`}>
      {menuItems.map((item, index) => {
        const active = location.pathname.match(item.url);
        const icon = active ? item.activeIcon : item.icon;
        const bgClass = active ? "tw-bg-bt-orange" : "";
        const textColor = active ? "tw-text-white" : "tw-text-bt-gray-600";
        const hoverClass = active ? "" : "hover:tw-bg-black/10";
        return (
          <Button
            key={index}
            onClick={() => onItemClick(item.url)}
            className={`${bgClass} ${textColor} ${hoverClass} tw-w-full tw-flex tw-items-center tw-h-48px tw-pl-18px
            lg:tw-mr-16px lg:tw-rounded-r-5px tw-text-20px`}
          >
            <img src={icon} className="tw-mr-15px" alt="menu item" />
            <span>{item.title}</span>
          </Button>
        );
      })}
    </nav>
  );
};

export default AppNavbar;
