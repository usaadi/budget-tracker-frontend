import { useState, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import AppToolbar from "../shared/AppToolbar";
import Summary from "./sections/Summary";
import Expenses from "./sections/Expenses";
import Income from "./sections/Income";

import { appSections } from "../shared/defines/consts";

const AppPage = () => {
  const [currentSection, setCurrentSection] = useState(appSections.summary);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const sections = useMemo(() => [
    {
      name: appSections.summary,
      component: <Summary selectedMonth={selectedMonth} />,
    },
    {
      name: appSections.expenses,
      component: <Expenses selectedMonth={selectedMonth} />,
    },
    {
      name: appSections.income,
      component: <Income selectedMonth={selectedMonth} />,
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
      lg:tw-w-800px lg:tw-mr-auto lg:tw-ml-auto tw-rounded tw-text-black/80"
    >
      <div>
        <AppToolbar
          selectedMonth={selectedMonth}
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