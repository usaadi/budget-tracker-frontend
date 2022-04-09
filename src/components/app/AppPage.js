import { useState, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import AppToolbar from "../shared/AppToolbar";
import Summary from "./sections/Summary";
import Transactions from "./sections/Transactions";
import ExpensesSummary from "./sections/ExpensesSummary";
import IncomeSummary from "./sections/IncomeSummary";
import Categories from "./sections/Categories";

import { appSections } from "../shared/defines/consts";
import { transactionTypeEnum } from "../../constants/enums";

const AppPage = () => {
  const [currentSection, setCurrentSection] = useState(appSections.summary);
  const date = new Date();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const sections = useMemo(() => [
    {
      name: appSections.summary,
      component: <Summary selectedMonth={selectedMonth} />,
    },
    {
      name: appSections.expenses,
      component: (
        <Transactions
          transactionType={transactionTypeEnum.expenses}
          selectedMonth={selectedMonth}
        />
      ),
    },
    {
      name: appSections.income,
      component: (
        <Transactions
          transactionType={transactionTypeEnum.income}
          selectedMonth={selectedMonth}
        />
      ),
    },
    {
      name: appSections.expensesSummary,
      component: <ExpensesSummary selectedMonth={selectedMonth} />,
    },
    {
      name: appSections.incomeSummary,
      component: <IncomeSummary selectedMonth={selectedMonth} />,
    },
    {
      name: appSections.expensesCategories,
      component: (
        <Categories
          transactionType={transactionTypeEnum.expenses}
          selectedMonth={selectedMonth}
        />
      ),
    },
    {
      name: appSections.incomeCategories,
      component: (
        <Categories
          transactionType={transactionTypeEnum.income}
          selectedMonth={selectedMonth}
        />
      ),
    },
  ]);

  const { logout } = useAuth0();

  const hiddenClass = "tw-hidden";

  const onSectionChanged = (index) => {
    const sectionName = sections[index].name;
    setCurrentSection(sectionName);
  };

  const onLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <div
      className="tw-border-2 tw-border-solid tw-border-black/40 tw-p-10px tw-mt-10px tw-mx-10px
      lg:tw-w-900px lg:tw-mr-auto lg:tw-ml-auto tw-rounded tw-text-black/80"
    >
      <div>
        <AppToolbar
          selectedMonth={selectedMonth}
          currentSection={currentSection}
          setSelectedMonth={setSelectedMonth}
          onSectionChanged={onSectionChanged}
          onLogout={onLogout}
        />
      </div>

      {sections?.map((section, index) => {
        const hiddenClassName =
          section.name !== currentSection ? hiddenClass : "";
        return (
          <div className={`${hiddenClassName} tw-mt-10px`} key={index}>
            {section.component}
          </div>
        );
      })}
    </div>
  );
};

export default AppPage;
